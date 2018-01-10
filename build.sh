DEST=/data/www/cdn/jptris
git pull origin master \
  && yarn install \
  && yarn build \
  && rm $DEST/* \
  && cp dist/* $DEST
