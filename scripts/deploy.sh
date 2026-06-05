#!/usr/bin/env sh
# Publish the prerendered site (.output/public) to the gh-pages branch that
# GitHub Pages serves for rihard-developer.ru. Run after `nuxt generate`.
set -e

DIR=".output/public"
REPO="git@github.com:RihardXXX/rihard-js-developer.git"
BRANCH="gh-pages"

if [ ! -f "$DIR/index.html" ]; then
  echo "✗ $DIR/index.html not found — run \`npm run generate\` first." >&2
  exit 1
fi

# Fresh throwaway repo inside the build output, force-pushed to gh-pages.
rm -rf "$DIR/.git"
git -C "$DIR" init -q
git -C "$DIR" checkout -q -B "$BRANCH"
git -C "$DIR" add -A
git -C "$DIR" -c user.email="deploy@local" -c user.name="deploy" \
  commit -q -m "deploy: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git -C "$DIR" push -f "$REPO" "$BRANCH"
rm -rf "$DIR/.git"
echo "✓ Deployed to $BRANCH → https://rihard-developer.ru"
