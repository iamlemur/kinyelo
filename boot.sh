#!/usr/bin/env bash

/sbin/service mysqld start
/etc/init.d/httpd start
echo "1" > /proc/sys/net/ipv4/ip_forward
iptables -t nat -A PREROUTING -p tcp --dport 9810 -j DNAT --to-destination 10.0.2.2:9810
iptables -t nat -A POSTROUTING -j MASQUERADE