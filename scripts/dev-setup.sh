#!/bin/bash
# thegriffinlegends.com/scripts/dev-setup.sh
# Created by Alexander Burdiss 5/17/2025
# Copyright (c) Alexander Burdiss
#
# A simple script that copies hooks from the scripts/hooks directory to the
# appropriate place in the untracked git configuration
#

git config core.hooksPath ./scripts/hooks
echo 'git hooks copied'
