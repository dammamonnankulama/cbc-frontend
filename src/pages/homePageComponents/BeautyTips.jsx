import React, { useState } from "react";
import { Link } from "react-router-dom";

function BeautyTips() {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = (e) => {
    e.preventDefault(); // Prevent the link's default behavior
    setShowMore((prevState) => !prevState);
  };
  return (
    <div className="bg-gradient-to-b from-pink-100 to-yellow-100 min-h-screen py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-gray-800 mb-3">
          Beauty Tips for Glowing Skin & Shiny Hair
        </h1>
        <p className="text-lg text-gray-600">
          Explore our tips and product recommendations for healthy skin and
          hair.
        </p>
      </div>

      {/* Skin Care Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 mb-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Skin Care Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Skin Care Product 1 */}
          <Link
            to="/productInfo/CBC0026"
            className="block bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-all"
          >
            <img
              src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//beauty%20tips.webp" // Replace with actual product image
              alt="The Ordinary Alpha Arbutin 2% + HA"
              className="w-full h-75 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                The Ordinary Alpha Arbutin 2% + HA
              </h3>
              <p className="text-gray-600 mt-2">
                A powerful serum to brighten your complexion and fade
                hyperpigmentation.
              </p>
              {/* Benefits Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Benefits
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Skin tone evenness and dark spots:</strong> Visibly
                    evens skin tone and reduces the look of dark spots.
                  </li>
                  <li>
                    <strong>Radiance and brightening:</strong> Significantly
                    improves skin’s radiance.
                  </li>
                  <li>
                    <strong>Skin quality:</strong> Improves the appearance of
                    skin quality.
                  </li>
                  <li>
                    <strong>Hydration:</strong> Boosts hydration instantly and
                    over time.
                  </li>
                </ul>
              </div>
              {/* How to Use Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  How to Use
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Step 1:</strong> Apply a few drops to the skin after
                    cleansing and toning.
                  </li>
                  <li>
                    <strong>Step 2:</strong> Gently massage the serum into the
                    skin, focusing on areas with dark spots.
                  </li>
                  <li>
                    <strong>Step 3:</strong> Follow with your favorite
                    moisturizer and sunscreen during the day.
                  </li>
                  <li>
                    <strong>Step 4:</strong> Use consistently for best results.
                  </li>
                </ul>
              </div>
              <img
                src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//0026.1.webp" // Replace with actual product image
                alt="The Ordinary Alpha Arbutin 2% + HA"
                className="w-full h-75 object-cover"
              />
            </div>
          </Link>
          {/* Skin Care Product 2 */}
          <Link
            to="/productInfo/CBC0021"
            className="block bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-all"
          >
            <img
              src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//beuty%20tips3.webp" // Replace with actual product image
              alt="The Ordinary AHA 30% + BHA 2% Peeling Solution"
              className="w-full h-75 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                The Ordinary AHA 30% + BHA 2% Peeling Solution
              </h3>
              <p className="text-gray-600 mt-2">
                This high-strength peel is a recommended facial exfoliator for
                experienced users looking to achieve smoother, clearer skin. It
                features a Tasmanian pepperberry derivative, a known
                anti-irritant and is further supported with hyaluronic acid,
                pro-vitamin B5, and black carrot.
              </p>

              {/* Benefits Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Benefits
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Targets:</strong> Textural Irregularities, Dullness,
                    Uneven Skin Tone.
                  </li>
                </ul>
              </div>

              {/* How to Use Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  How to Use
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Step 1:</strong> Use once or twice a week, ideally
                    in the evening, on thoroughly clean, dry skin. Do not use on
                    wet skin.
                  </li>
                  <li>
                    <strong>Step 2:</strong> Apply evenly across the face and
                    neck using fingertips. Do not use on sensitive, peeling, or
                    compromised skin.
                  </li>
                  <li>
                    <strong>Step 3:</strong> Avoid the eye contour and contact
                    with eyes both during application and rinse off.
                  </li>
                  <li>
                    <strong>Step 4:</strong> Leave on for no more than 10
                    minutes.
                  </li>

                  {/* Conditional Steps 5 - 9 */}
                  {showMore && (
                    <>
                      <li>
                        <strong>Step 5:</strong> Rinse thoroughly with lukewarm
                        water.
                      </li>
                      <li>
                        <strong>Step 6:</strong> Contact of the product with the
                        skin must be of limited frequency or duration.
                      </li>
                      <li>
                        <strong>Step 7:</strong> If irritation occurs, rinse
                        off, cease use, and consult a physician.
                      </li>
                      <li>
                        <strong>Step 8:</strong> Use only as directed on
                        unbroken skin. Patch testing prior to use is advised.
                      </li>
                      <li>
                        <strong>Step 9:</strong> Keep out of reach of children.
                      </li>
                      <li>
                        <strong>Sunburn Alert:</strong> This product contains an
                        alpha hydroxy acid (AHA) and a beta hydroxy acid (BHA)
                        that may increase your skin’s sensitivity to the sun and
                        particularly the possibility of sunburn. Use a
                        sunscreen, wear protective clothing, and limit sun
                        exposure while using this product and for a week
                        afterward.
                      </li>
                    </>
                  )}
                </ul>

                {/* See More Button */}
                <button
                  onClick={toggleShowMore} // Prevent link navigation on button click
                  className="mt-4 text-blue-500 hover:underline"
                >
                  {showMore ? "See Less" : "See More"}
                </button>
              </div>

              <img
                src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//1740150785704.webp" // Replace with actual product image
                alt="The Ordinary AHA 30% + BHA 2% Peeling Solution"
                className="w-full h-75 object-cover"
              />
            </div>
          </Link>

          {/* Skin Care Product 3 */}
          <Link
            to="/productInfo/CBC0036"
            className="block bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-all"
          >
            <img
              src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//beauty%20tip3.jpg" // Replace with actual product image
              alt="Cetaphil Daily Facial Cleanser 237ml"
              className="w-full h-75 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Cetaphil Daily Facial Cleanser 237ml
              </h3>
              <p className="text-gray-600 mt-2">
                Specially formulated gentle gel-to-foam formula deep cleans and
                minimizes the appearance of pores without stripping skin of
                natural moisture.
              </p>

              {/* Benefits Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Benefits
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>
                      Clinically proven to remove 94% of impurities.
                    </strong>
                  </li>
                  <li>
                    <strong>
                      Designed with a dermatologist-backed blend of Vitamin B3,
                      Vitamin B5, and hydrating Glycerin
                    </strong>{" "}
                    to improve the resilience of sensitive skin.
                  </li>
                  <li>
                    <strong>
                      Deep cleans while effectively removing dirt, excess oils,
                      and makeup
                    </strong>{" "}
                    without leaving the skin dry or tight. Ideal for sensitive,
                    combination, and oily skin types.
                  </li>
                  <li>
                    <strong>Parabens & Sulfate Free.</strong>
                  </li>
                  <li>
                    <strong>Defends against 5 signs of skin sensitivity</strong>{" "}
                    including dryness, irritation, roughness, tightness, and a
                    weakened skin barrier.
                  </li>
                </ul>
              </div>

              {/* How to Use Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  How to Use
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Step 1:</strong> Massage a small amount onto wet
                    skin.
                  </li>
                  <li>
                    <strong>Step 2:</strong> Rinse thoroughly.
                  </li>
                </ul>
              </div>

              <img
                src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//1742317492103.avif" // Replace with actual product image
                alt="Cetaphil Daily Facial Cleanser"
                className="w-full h-75 object-cover"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Hair Care Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Hair Care Tips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Hair Care Product 1 */}
          <Link
            to="/productInfo/CBC0022"
            className="block bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-all"
          >
            <img
              src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//beauty%20tips6.jpg" // Replace with actual product image
              alt="Nizoral Anti Dandruff Shampoo"
              className="w-full h-75 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Nizoral Anti Dandruff Shampoo
              </h3>
              <p className="text-gray-600 mt-2">
                Nizoral Anti-Dandruff Shampoo contains ketoconazole 1% for
                dandruff relief. A powerful dandruff control shampoo that helps
                you maintain a healthy scalp.
              </p>

              {/* Benefits Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Benefits
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Clinically Proven:</strong> Removes up to 94% of
                    dandruff and impurities, leaving the scalp fresh and clean.
                  </li>
                  <li>
                    <strong>Gentle Formula:</strong> Contains Vitamin B3,
                    Vitamin B5, and hydrating Glycerin to strengthen the scalp’s
                    natural defenses, ideal for sensitive skin.
                  </li>
                  <li>
                    <strong>Deep Cleansing:</strong> Effectively removes dirt,
                    excess oils, and buildup while maintaining a healthy scalp
                    environment.
                  </li>
                  <li>
                    <strong>Non-Drying:</strong> Paraben and sulfate-free,
                    ensuring that your scalp stays moisturized without feeling
                    dry or tight.
                  </li>
                  <li>
                    <strong>Scalp Health:</strong> Defends against the five key
                    signs of scalp sensitivity: dryness, irritation, roughness,
                    tightness, and a weakened skin barrier.
                  </li>
                  <li>
                    <strong>Effective for All Hair Types:</strong> Great for
                    people with oily, combination, or sensitive scalps.
                  </li>
                </ul>
              </div>

              {/* How to Use Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  How to Use
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Step 1:</strong> Apply a small amount to wet hair
                    and scalp.
                  </li>
                  <li>
                    <strong>Step 2:</strong> Gently massage into the scalp,
                    working it into a lather.
                  </li>
                  <li>
                    <strong>Step 3:</strong> Leave on for 3-5 minutes for
                    optimal results.
                  </li>
                  <li>
                    <strong>Step 4:</strong> Rinse thoroughly with warm water.
                  </li>
                  <li>
                    <strong>Step 5:</strong> For best results, use twice a week
                    or as directed by a healthcare provider.
                  </li>
                </ul>
              </div>

              <img
                src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//CBC0022a.jpg" // Replace with actual product image
                alt="Nizoral Anti Dandruff Shampoo"
                className="w-full h-75 object-cover"
              />
            </div>
          </Link>
          {/* Hair Care Product 2 */}
          <Link
            to="/productInfo/CBC0037"
            className="block bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-all"
          >
            <img
              src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//haircare3.avif" // Replace with actual product image
              alt="Mielle Rosemary Mint Strengthening Shampoo"
              className="w-full h-75 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Mielle Rosemary Mint Strengthening Shampoo
              </h3>
              <p className="text-gray-600 mt-2">
                Mielle's Rosemary Mint Strengthening Shampoo was developed to
                gently cleanse your hair while providing key nutrients. With
                hair-strengthening biotin and certified organic ingredients such
                as coconut and babassu seed oil, you can bring weak or brittle
                hair back from the brink. This strengthening shampoo also
                provides intense moisture for all hair types along with
                unrivaled slip.
              </p>

              {/* Benefits Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Benefits
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Strengthening Formula:</strong> Packed with biotin
                    and organic ingredients like coconut and babassu seed oil to
                    help nourish and strengthen weak, brittle hair.
                  </li>
                  <li>
                    <strong>Deep Moisturization:</strong> Provides intense
                    moisture for all hair types, leaving hair smooth, shiny, and
                    full of life.
                  </li>
                  <li>
                    <strong>Gentle Cleansing:</strong> Gently cleanses the scalp
                    and hair without stripping natural oils, promoting a healthy
                    scalp environment.
                  </li>
                  <li>
                    <strong>Improves Hair Health:</strong> Helps to revitalize
                    hair by improving resilience and protecting against damage.
                  </li>
                  <li>
                    <strong>Refreshing Scent:</strong> Infused with a refreshing
                    rosemary and mint fragrance that leaves hair feeling fresh
                    and invigorated.
                  </li>
                  <li>
                    <strong>Suitable for All Hair Types:</strong> Ideal for
                    anyone with dry, damaged, or brittle hair, and safe for all
                    hair types, including curly, straight, or wavy.
                  </li>
                </ul>
              </div>

              {/* How to Use Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  How to Use
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Step 1:</strong> Apply a generous amount to wet hair
                    and scalp.
                  </li>
                  <li>
                    <strong>Step 2:</strong> Gently massage into the scalp to
                    create a lather and distribute evenly through the hair.
                  </li>
                  <li>
                    <strong>Step 3:</strong> Leave on for 2-3 minutes to allow
                    the nourishing ingredients to work their magic.
                  </li>
                  <li>
                    <strong>Step 4:</strong> Rinse thoroughly with warm water.
                  </li>
                  <li>
                    <strong>Step 5:</strong> For best results, follow with a
                    conditioner from the Mielle Rosemary Mint collection.
                  </li>
                  <li>
                    <strong>Step 6:</strong> Use 2-3 times a week or as needed
                    for optimal hair health and strength.
                  </li>
                </ul>
              </div>

              <img
                src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//cbc0039.jpg" // Replace with actual product image
                alt="Mielle Rosemary Mint Strengthening Shampoo"
                className="w-full h-75 object-cover"
              />
            </div>
          </Link>

          {/* Hair Care Product 3 */}
          <Link
            to="/productInfo/CBC0038"
            className="block bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-all"
          >
            <img
              src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//beauty%20tips5.webp" // Replace with actual product image
              alt="SOME BY MI Cica Peptide Anti Hair Loss Derma Scalp Shampoo 285ml"
              className="w-full h-75 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                SOME BY MI Cica Peptide Anti Hair Loss Derma Scalp Shampoo 285ml
              </h3>
              <p className="text-gray-600 mt-2">
                The Cica Peptide Anti Hair Loss Derma Scalp Shampoo is a
                specialized shampoo formulated with cica (Centella Asiatica)
                extract and peptides to target hair loss and promote scalp
                health.
              </p>

              {/* Benefits Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Benefits
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Anti-Hair Loss Formula:</strong> Contains cica
                    extract and peptides that promote scalp health and reduce
                    hair loss.
                  </li>
                  <li>
                    <strong>Strengthens Hair:</strong> Helps to strengthen hair
                    and improve its resilience, promoting thicker, healthier
                    hair.
                  </li>
                  <li>
                    <strong>Balances Scalp Health:</strong> Designed to maintain
                    a healthy scalp by restoring moisture and reducing
                    irritation.
                  </li>
                  <li>
                    <strong>Gentle Yet Effective:</strong> Provides deep
                    cleansing without stripping natural oils, leaving the scalp
                    refreshed.
                  </li>
                  <li>
                    <strong>Soothing Formula:</strong> The calming properties of
                    Centella Asiatica help soothe sensitive scalps and reduce
                    inflammation.
                  </li>
                  <li>
                    <strong>Suitable for All Hair Types:</strong> Ideal for
                    anyone experiencing hair thinning or hair loss, and safe for
                    all hair types.
                  </li>
                </ul>
              </div>

              {/* How to Use Section */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  How to Use
                </h4>
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  <li>
                    <strong>Step 1:</strong> Apply a generous amount to wet hair
                    and scalp.
                  </li>
                  <li>
                    <strong>Step 2:</strong> Gently massage into the scalp to
                    create a lather and distribute evenly through the hair.
                  </li>
                  <li>
                    <strong>Step 3:</strong> Leave on for 2-3 minutes to allow
                    the nourishing ingredients to work their magic.
                  </li>
                  <li>
                    <strong>Step 4:</strong> Rinse thoroughly with warm water.
                  </li>
                  <li>
                    <strong>Step 5:</strong> For best results, follow with a
                    conditioner from the SOME BY MI Cica Peptide collection.
                  </li>
                  <li>
                    <strong>Step 6:</strong> Use 2-3 times a week or as needed
                    for optimal hair health and strength.
                  </li>
                </ul>
              </div>

              <img
                src="https://dteetoxzwiwrovoohdpd.supabase.co/storage/v1/object/public/cbc_images//1742320242827.webp" // Replace with actual product image
                alt="SOME BY MI Cica Peptide Anti Hair Loss Derma Scalp Shampoo 285ml"
                className="w-full h-75 object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BeautyTips;
