#!/bin/bash

BASE_URL="https://rdatsko.github.io/pspi"

detect_architecture() {
    local arch
    arch=$(uname -m)

    case "$arch" in
        x86_64|aarch64)
            echo "64-bit OS detected"
            ARCH_SUFFIX="_64"
            ;;
        *)
            echo "32-bit OS detected"
            ARCH_SUFFIX="_32"
            ;;
    esac
}

download_pspi_files() {
    echo "Downloading PSPi files..."

    TMP_DIR="/tmp/pspi"

    rm -rf "$TMP_DIR"

    mkdir -p "$TMP_DIR/drivers"
    mkdir -p "$TMP_DIR/overlays"

    DRIVER_FILES=(
        "main_32"
        "main_64"
        "gamepad_32"
        "gamepad_64"
        "mouse_32"
        "mouse_64"
        "osd_32"
        "osd_64"
    )

    for file in "${DRIVER_FILES[@]}"; do
        echo "Downloading $file..."
        curl -L "$BASE_URL/drivers/bin/$file" \
            -o "$TMP_DIR/drivers/$file"

        chmod +x "$TMP_DIR/drivers/$file"
    done

    OVERLAY_FILES=(
        "dpi24.dtbo"
    )

    for file in "${OVERLAY_FILES[@]}"; do
        echo "Downloading $file..."
        curl -L "$BASE_URL/overlays/$file" \
            -o "$TMP_DIR/overlays/$file"
    done

    echo "Downloads complete."
}

lakka_setup() {
    echo "Lakka OS detected. Setting up autostart script..."

    mkdir -p /storage/pspi/drivers

    cp /tmp/pspi/drivers/* /storage/pspi/drivers/

    if [ -f "/storage/.config/autostart.sh" ]; then
        mv "/storage/.config/autostart.sh" \
           "/storage/.config/autostart.old"

        echo "Renamed existing autostart.sh to autostart.old"
    fi

    cat << EOF > /storage/.config/autostart.sh
#!/bin/bash
/storage/pspi/drivers/main$ARCH_SUFFIX &
sleep 1
/storage/pspi/drivers/gamepad$ARCH_SUFFIX &
/storage/pspi/drivers/osd$ARCH_SUFFIX &
EOF

    chmod +x /storage/.config/autostart.sh

    echo "New autostart.sh for Lakka created and configured."

    if [ -f "/storage/joypads/udev/PSPi-Controller.cfg" ]; then
        mv "/storage/joypads/udev/PSPi-Controller.cfg" \
           "/storage/joypads/udev/PSPi-Controller.old"

        echo "Renamed existing PSPi-Controller.cfg"
    fi

    cat << EOF > /storage/joypads/udev/PSPi-Controller.cfg
input_driver = "udev"
input_device = "PSPi-Controller"
input_vendor_id = "4660"
input_product_id = "22136"
input_b_btn = "3"
input_y_btn = "4"
input_select_btn = "1"
input_start_btn = "2"
input_up_btn = "10"
input_down_btn = "11"
input_left_btn = "9"
input_right_btn = "12"
input_a_btn = "6"
input_x_btn = "5"
input_l_btn = "8"
input_r_btn = "7"
input_l_x_plus_axis = "+0"
input_l_x_minus_axis = "-0"
input_l_y_plus_axis = "+1"
input_l_y_minus_axis = "-1"
input_gun_trigger_mbtn = "1"
EOF

    sed -i \
        '/input_quit_gamepad_combo/c\input_quit_gamepad_combo = "4"' \
        /storage/.config/retroarch/retroarch.cfg

    echo "Modified RetroArch configuration."

    read -p "Reboot now? (yes/no) " answer

    case $answer in
        [Yy]* ) reboot ;;
        * ) echo "Please reboot manually." ;;
    esac
}

batocera_setup() {
    echo "Batocera setup not yet implemented."
}

raspbian_setup() {
    enable_i2c
    remove_services
    copy_binaries
    install_overlays
    add_services
}

ubuntu_setup() {
    remove_services
    copy_binaries
    add_services
}

remove_services() {
    echo "Disabling and removing existing services..."

    for service in main osd mouse gamepad; do
        sudo systemctl stop ${service}${ARCH_SUFFIX}.service \
            2>/dev/null || true

        sudo systemctl disable ${service}${ARCH_SUFFIX}.service \
            2>/dev/null || true

        sudo rm -f \
            /etc/systemd/system/${service}${ARCH_SUFFIX}.service
    done

    sudo systemctl daemon-reload

    echo "Existing services removed."
}

enable_i2c() {
    echo "Enabling I2C..."

    CONFIG="/boot/config.txt"
    BLACKLIST="/etc/modprobe.d/raspi-blacklist.conf"

    if grep -q "^dtparam=i2c_arm=" "$CONFIG"; then
        sudo sed -i \
            's/^dtparam=i2c_arm=.*/dtparam=i2c_arm=on/' \
            "$CONFIG"

    elif grep -q "^#dtparam=i2c_arm=" "$CONFIG"; then
        sudo sed -i \
            's/^#dtparam=i2c_arm=.*/dtparam=i2c_arm=on/' \
            "$CONFIG"

    else
        echo "dtparam=i2c_arm=on" | sudo tee -a "$CONFIG"
    fi

    if [ -e "$BLACKLIST" ]; then
        sudo sed -i \
            's/^\(blacklist[[:space:]]*i2c[-_]bcm2708\)/#\1/' \
            "$BLACKLIST"
    fi

    if ! grep -q "^i2c[-_]dev" /etc/modules; then
        echo "i2c-dev" | sudo tee -a /etc/modules
    fi

    sudo modprobe i2c-dev
}

copy_binaries() {
    echo "Copying binaries..."

    sudo cp /tmp/pspi/drivers/* /usr/bin/

    sudo chmod +x /usr/bin/main_* \
                    /usr/bin/gamepad_* \
                    /usr/bin/mouse_* \
                    /usr/bin/osd_*
}

install_overlays() {
    echo "Installing overlays..."

    sudo cp /tmp/pspi/overlays/* /boot/overlays/
}

add_services() {
    echo "Creating startup scripts..."

    sudo tee /usr/local/bin/start_main.sh > /dev/null <<EOF
#!/bin/bash
/usr/bin/main$ARCH_SUFFIX
EOF

    sudo tee /usr/local/bin/start_mouse.sh > /dev/null <<EOF
#!/bin/bash
/usr/bin/mouse$ARCH_SUFFIX
EOF

    sudo tee /usr/local/bin/start_osd.sh > /dev/null <<EOF
#!/bin/bash
/usr/bin/osd$ARCH_SUFFIX
EOF

    sudo chmod +x /usr/local/bin/start_main.sh
    sudo chmod +x /usr/local/bin/start_mouse.sh
    sudo chmod +x /usr/local/bin/start_osd.sh

    echo "Creating systemd service files..."

    sudo tee /etc/systemd/system/main${ARCH_SUFFIX}.service > /dev/null <<EOF
[Unit]
Description=PSPi Main Service
After=network.target

[Service]
ExecStart=/usr/local/bin/start_main.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

    sudo tee /etc/systemd/system/mouse${ARCH_SUFFIX}.service > /dev/null <<EOF
[Unit]
Description=PSPi Mouse Service
After=main${ARCH_SUFFIX}.service

[Service]
ExecStart=/usr/local/bin/start_mouse.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

    sudo tee /etc/systemd/system/osd${ARCH_SUFFIX}.service > /dev/null <<EOF
[Unit]
Description=PSPi On Screen Display Service
After=network.target

[Service]
ExecStart=/usr/local/bin/start_osd.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload

    echo "Enabling services..."

    sudo systemctl enable main${ARCH_SUFFIX}.service
    sudo systemctl enable osd${ARCH_SUFFIX}.service

    sudo systemctl start main${ARCH_SUFFIX}.service
    sudo systemctl start osd${ARCH_SUFFIX}.service

    read -p "Enable and start the mouse service? [y/N]: " enable_mouse

    if [[ "$enable_mouse" =~ ^[Yy]$ ]]; then
        sudo systemctl enable mouse${ARCH_SUFFIX}.service
        sudo systemctl start mouse${ARCH_SUFFIX}.service
    else
        echo "Skipping mouse${ARCH_SUFFIX}.service"
    fi

    read -p "Enable and start the gamepad service? [y/N]: " enable_gamepad

    if [[ "$enable_gamepad" =~ ^[Yy]$ ]]; then

        sudo tee /etc/systemd/system/gamepad${ARCH_SUFFIX}.service > /dev/null <<EOF
[Unit]
Description=PSPi Gamepad Service
After=main${ARCH_SUFFIX}.service

[Service]
ExecStart=/usr/bin/gamepad$ARCH_SUFFIX
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

        sudo systemctl daemon-reload

        sudo systemctl enable gamepad${ARCH_SUFFIX}.service
        sudo systemctl start gamepad${ARCH_SUFFIX}.service

    else
        echo "Skipping gamepad${ARCH_SUFFIX}.service"
    fi

    echo "Services added and started."
}

unknown_setup() {
    echo "Unknown or unsupported OS."
}

detect_os_and_setup_services() {
    OS=$(grep '^ID=' /etc/os-release \
        | cut -d= -f2 \
        | tr -d '"')

    echo "Operating System Detected: $OS"

    case "$OS" in
        batocera)
            batocera_setup
            ;;
        debian)
            raspbian_setup
            ;;
        raspbian)
            raspbian_setup
            ;;
        retropie)
            raspbian_setup
            ;;
        ubuntu)
            ubuntu_setup
            ;;
        lakka)
            lakka_setup
            ;;
        *)
            unknown_setup
            ;;
    esac
}

detect_architecture
download_pspi_files
detect_os_and_setup_services

echo "Installation complete."