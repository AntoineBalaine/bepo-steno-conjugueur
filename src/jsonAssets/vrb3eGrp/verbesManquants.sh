#!/bin/bash

# -sors tous les infinitifs du modèle sans frappes
# -s'ils ne sont pas dans la liste des infinitifs
#   rentre les dans le fichier «infinitifs manquants»

infinitifsFrappes=$(jq '.' "$1");
infinifsSansFrappes=$(jq '.[]' "$2")
mapfile -t myArray < <( echo "$infinifsSansFrappes")

for item in "${myArray[@]}"; do
if grep -Fq "$item" <(echo "$infinitifsFrappes"); then
:
else
# trouve si ces verbes ont une correspondance 
echo "$item" >> infinitifsÀMonter.json
fi;

done
