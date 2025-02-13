self: super: {
  yarn = super.yarn.overrideAttrs (oldAttrs: rec {
    installPhase = ''
      runHook preInstall
      mkdir -p $out
      cp -r $src/* $out
      if [ -f $out/LICENSE ]; then
        mv $out/LICENSE $out/LICENSE.yarn
      fi
      runHook postInstall
    '';
  });
}

