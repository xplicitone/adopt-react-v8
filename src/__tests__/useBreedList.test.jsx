import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: false,
    },
  },
});

function getBreedList(animal) {
  // how to test hooks (useBreedList) outside a [react] component? You cannot.
  // make a react component just to test
  let list;

  // valid react component, all we gotta do is then render it...
  function TestComponent() {
    list = useBreedList(animal);
    return null;
  }

  render(
    <QueryClientProvider client={queryClient}>
      <TestComponent />
    </QueryClientProvider>
  );

  // cheating lol. Go thru lifecycle, call useBreedList, save it in the let, so just have to return it
  return list;
}

test("gives an empty list with no animal provided", async () => {
  const [breedList, status] = getBreedList();
  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
});
