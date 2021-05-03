#!/bin/sh

kill $(ps -a | grep node | awk '{ print $1 }')