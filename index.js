const fs = require("fs/promises");
const { program } = require("commander");
const contactOperation = require("./db");

const makeOperationsContacts = async (
  contactsPath,
  action = "read",
  data = ""
) => {
  switch (action) {
    case "read":
      const text = await fs.readFile(contactsPath, "utf-8");
      console.log(text);
      break;
    case "replace":
      await fs.writeFile(contactsPath, data);
      break;
    default:
      console.log("Default action");
  }
};

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactOperation.getListContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactOperation.getContactById(id);
      if (!contact) {
        throw new Error(`Product with ${id} does not exist`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contactOperation.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeCoctact = await contactOperation.removeContact(id);
      console.log(removeCoctact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "contact operations")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);
const options = program.opts();
invokeAction(options);
