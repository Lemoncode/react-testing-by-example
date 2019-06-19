import * as React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { NameCollection } from "./name-collection";
import * as nameApi from "./name-api";

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

// WIP !! not finished
describe("Name collection component", () => {
  it("Should display a list of names after async call gets resolved", async () => {
    const fetchMembersStub = jest
      .spyOn(nameApi, "getNameCollection")
      .mockResolvedValue([
        {
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496"
            }
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets"
          }
        }
      ]);

    const { getByText } = render(<NameCollection />);

    await waitForElement(() => getByText("Leanne Graham"));

    const liElement = getByText("Leanne Graham");

    expect(liElement.nodeName).toBe("LI");
  });
});
