import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import Pet from "../Pet";

test("displays a default thumbnail", async () => {
  // Step 1: Render something
  const pet = render(
    <StaticRouter>
      <Pet />
    </StaticRouter>
  );

  // Step 2:Find thumbnail
  const petThumbnail = await pet.findByTestId("thumbnail");

  // Step 3: Make sure source contains none if you do not find anything
  expect(petThumbnail.src).toContain("none.jpg");

  // vitest takes testsuite and run it in parallel to run it faster so call unmount
  pet.unmount();
});

test("displays a non-default thumbnail", async () => {
  // Step 1: Render something
  const pet = render(
    <StaticRouter>
      <Pet images={["1.jpg", "2.jpg", "3.jpg"]} />
    </StaticRouter>
  );

  const petThumbnail = await pet.findByTestId("thumbnail");
  expect(petThumbnail.src).toContain("1.jpg");
  pet.unmount();
});
