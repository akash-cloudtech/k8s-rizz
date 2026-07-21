#!/bin/sh
set -eu

REPO="akash-cloudtech/k8s-rizz"
BASE_URL="https://github.com/${REPO}/releases/latest/download"
BIN_NAME="k8s-rizz-check"

case "$(uname -s)" in
  Darwin) os="darwin" ;;
  Linux) os="linux" ;;
  *)
    echo "k8s-rizz-check: unsupported OS '$(uname -s)'." >&2
    echo "Windows users: grab the binary directly from:" >&2
    echo "  https://github.com/${REPO}/releases/latest" >&2
    exit 1
    ;;
esac

case "$(uname -m)" in
  arm64|aarch64) arch="arm64" ;;
  x86_64|amd64) arch="x86_64" ;;
  *)
    echo "k8s-rizz-check: unsupported architecture '$(uname -m)'." >&2
    exit 1
    ;;
esac

if [ "$os" = "darwin" ] && [ "$arch" = "x86_64" ]; then
  echo "k8s-rizz-check: no Intel macOS build is published yet." >&2
  echo "Only darwin-arm64 (Apple Silicon) is currently available. See:" >&2
  echo "  https://github.com/${REPO}/releases/latest" >&2
  exit 1
fi

asset="${BIN_NAME}-${os}-${arch}"
url="${BASE_URL}/${asset}"

install_dir="/usr/local/bin"
if [ ! -w "$install_dir" ]; then
  install_dir="${HOME}/.local/bin"
  mkdir -p "$install_dir"
fi

tmp="$(mktemp)"
echo "Downloading ${asset}..."
curl -fsSL "$url" -o "$tmp"
chmod +x "$tmp"
mv "$tmp" "${install_dir}/${BIN_NAME}"

echo "Installed to ${install_dir}/${BIN_NAME}"

case ":$PATH:" in
  *":${install_dir}:"*) ;;
  *)
    echo ""
    echo "Note: ${install_dir} is not on your PATH. Add it with:"
    echo "  export PATH=\"${install_dir}:\$PATH\""
    ;;
esac

echo ""
echo "Run '${BIN_NAME}' to get started."
