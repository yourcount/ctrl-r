import type { StructureResolver } from "sanity/structure";

const singletonTypes = new Set(["siteSettings", "homePage", "contactInfo"]);

function singletonListItem(S: Parameters<StructureResolver>[0], typeName: string, title: string) {
  return S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName));
}

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singletonListItem(S, "siteSettings", "Site-instellingen"),
      singletonListItem(S, "homePage", "Homepage"),
      singletonListItem(S, "contactInfo", "Contactinformatie"),
      S.divider(),
      S.documentTypeListItem("cta").title("CTA's"),
      S.documentTypeListItem("service").title("Diensten"),
      S.documentTypeListItem("projectCase").title("Projectcases"),
      ...S.documentTypeListItems().filter(
        (item) => !item.getId() || !singletonTypes.has(item.getId()!),
      ),
    ]);
