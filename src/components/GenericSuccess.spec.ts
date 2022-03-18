import { mount } from "@cypress/vue";
import GenericSuccess from "./GenericSuccess.vue";

it("GenericSuccess", () => {
  mount(GenericSuccess, {
    slots: {
      default: { render: () => "Test Generic Success" },
    },
  });

  cy.get("[data-cy=generic-success__default-slot-wrapper]").contains("Test Generic Success");
});
