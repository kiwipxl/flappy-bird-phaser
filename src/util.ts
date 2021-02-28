import "phaser";

export function getTextureSize(
  texture: Phaser.Textures.Texture
): Phaser.Structs.Size {
  return new Phaser.Structs.Size(
    texture.source[0].width,
    texture.source[0].height
  );
}
