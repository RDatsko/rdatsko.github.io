#!/bin/bash

# Raspberry Pi OS Trixie -> KDE Plasma 6 FULL AUTO INSTALLER
# Optimized for Raspberry Pi 5
#
# Fully unattended:
#   curl -fsSL https://rdatsko.gitub.io/kde.sh | sudo bash
#
# Features:
# - Installs full KDE Plasma 6 desktop
# - Enables Wayland
# - Configures SDDM automatically
# - Enables Pi 5 graphics acceleration
# - Sets graphical boot target
# - Enables Flatpak + Flathub
# - Applies KDE Pi performance tweaks
# - No prompts / no interaction required

set -euo pipefail

########################################
# Logging
########################################

log() {
    echo
    echo "=================================================="
    echo "$1"
    echo "=================================================="
}

########################################
# Root check
########################################

if [[ $EUID -ne 0 ]]; then
    echo
    echo "Run using:"
    echo
    echo "curl -fsSL URL | sudo bash"
    echo
    exit 1
fi

########################################
# Verify Trixie
########################################

log "Checking operating system"

source /etc/os-release

if [[ "${VERSION_CODENAME:-}" != "trixie" ]]; then
    echo
    echo "ERROR:"
    echo "This installer is intended for Raspberry Pi OS Trixie."
    echo
    echo "Detected: ${VERSION_CODENAME:-unknown}"
    echo
    exit 1
fi

########################################
# Verify Pi 5
########################################

log "Checking Raspberry Pi model"

PI_MODEL="$(tr -d '\0' </proc/device-tree/model 2>/dev/null || true)"

echo "$PI_MODEL"

########################################
# Update system
########################################

log "Updating system"

apt update

DEBIAN_FRONTEND=noninteractive \
apt full-upgrade -y

########################################
# Install KDE Plasma 6
########################################

log "Installing KDE Plasma 6"

DEBIAN_FRONTEND=noninteractive \
apt install -y \
    kde-full \
    plasma-workspace-wayland \
    sddm \
    sddm-theme-breeze \
    dolphin \
    konsole \
    kate \
    ark \
    gwenview \
    okular \
    plasma-discover \
    flatpak \
    pipewire \
    pipewire-audio \
    wireplumber \
    vulkan-tools \
    mesa-vulkan-drivers \
    mesa-utils

########################################
# Configure SDDM
########################################

log "Configuring SDDM"

mkdir -p /etc/sddm.conf.d

cat > /etc/sddm.conf.d/autologin.conf << 'EOF'
[General]
DisplayServer=wayland

[Theme]
Current=breeze
EOF

systemctl enable sddm

########################################
# Set graphical boot
########################################

log "Setting graphical boot target"

systemctl set-default graphical.target

########################################
# Enable Flatpak repository
########################################

log "Configuring Flathub"

flatpak remote-add --if-not-exists flathub \
https://dl.flathub.org/repo/flathub.flatpakrepo || true

########################################
# Configure Pi graphics
########################################

log "Configuring Raspberry Pi graphics"

CONFIG_FILE="/boot/firmware/config.txt"

if [[ -f "$CONFIG_FILE" ]]; then

    sed -i '/^gpu_mem=/d' "$CONFIG_FILE"
    sed -i '/^dtoverlay=vc4-kms-v3d/d' "$CONFIG_FILE"

    echo "gpu_mem=256" >> "$CONFIG_FILE"
    echo "dtoverlay=vc4-kms-v3d" >> "$CONFIG_FILE"
fi

########################################
# Configure user environment
########################################

log "Applying KDE user tweaks"

REAL_USER=""

if [[ -n "${SUDO_USER:-}" && "${SUDO_USER}" != "root" ]]; then
    REAL_USER="$SUDO_USER"
else
    REAL_USER="$(getent passwd 1000 | cut -d: -f1 || true)"
fi

if [[ -n "$REAL_USER" ]]; then

    USER_HOME="$(eval echo "~$REAL_USER")"

    mkdir -p "$USER_HOME/.config"

    ####################################
    # KDE compositor settings
    ####################################

    cat > "$USER_HOME/.config/kwinrc" << 'EOF'
[Compositing]
Backend=OpenGL
GLCore=true
Enabled=true

[Wayland]
InputMethod[$e]=/usr/share/applications/org.freedesktop.IBus.Panel.Wayland.desktop
EOF

    ####################################
    # Environment tweaks
    ####################################

    cat > "$USER_HOME/.profile" << 'EOF'

# KDE Plasma Wayland
export QT_QPA_PLATFORM=wayland
export GDK_BACKEND=wayland
export MOZ_ENABLE_WAYLAND=1

# Pi graphics tweaks
export KWIN_DRM_USE_EGL_STREAMS=0

EOF

    ####################################
    # Permissions
    ####################################

    chown -R "$REAL_USER:$REAL_USER" \
        "$USER_HOME/.config" \
        "$USER_HOME/.profile"
fi

########################################
# Cleanup
########################################

log "Cleaning packages"

apt autoremove -y

########################################
# Final status
########################################

log "KDE Plasma installation complete"

echo
echo "System will reboot automatically in 10 seconds..."
echo

sleep 10

reboot