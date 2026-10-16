export default function PhotoCredit({ recipe }) {
  if (!recipe.imageCredit || !recipe.imageCreditUrl || !recipe.imageLicenseUrl) {
    return null;
  }

  return (
    <div className="photo-credit">
      <a href={recipe.imageCreditUrl} target="_blank" rel="noreferrer">
        Photo: {recipe.imageCredit} · Wikimedia Commons
      </a>
      <a href={recipe.imageLicenseUrl} target="_blank" rel="noreferrer">
        {recipe.imageLicense}
      </a>
    </div>
  );
}
