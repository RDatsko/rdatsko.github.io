#!/bash/bin





#sudo apt install vim -y

# Install CUPS Server
# ==================================================

#sudo apt install cups -y

#sudo cp /etc/cups/cupsd.conf /etc/cups/cupsd.conf.original
#sudo chmod a-w /etc/cups/cupsd.conf.original

# Modify /etc/cups/cupsd.conf
# ----------------------------------------

# ServerAdmin bjoy@somebigco.com

# Listen /var/run/cups/cups.sock # existing socket Listen
# Listen 192.168.10.250:631      # Listen on the LAN interface, Port 631 (IPP)

# ----------------------------------------

#sudo systemctl restart cups.service

#sudo usermod -aG lpadmin ajis_admin

# Install the printer drivers





# Install PaperCut
# ==================================================

#sudo apt install perl -y

#useradd -m -d /home/papercut papercut
#usermod -a -G wheel papercut

#echo "papercut - nofile 65535" | sudo tee -a /etc/security/limits.conf

#echo "wrapper.java.additional.6=-Xmx3000m" | sudo tee -a /server/custom/service.conf

#su - papercut
#wget [download url from PaperCut Software website]
#sh /ng-mf/pcmf-setup-*-linux-*.sh

