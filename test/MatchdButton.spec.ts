import { mount } from "@cypress/vue";
import MatchdButton from "../src/components/MatchdButton.vue";

describe("MatchdButton", () => {
  it("MatchdButton", () => {
    mount(MatchdButton, {
      props: {
        dense: true,
        disabled: false,
        highlight: true,
      },
      slots: {
        default: "Hello",
      },
    });

    cy.get("button").contains("Hello").click();
  });
});
