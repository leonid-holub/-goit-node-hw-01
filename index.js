const contactsOperations = require("./contacts");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contactsOperations.listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contactbyId = await contactsOperations.getContactById(id);
      if (!contactbyId) {
        throw new Error(`Contact with id=${id} not found`);
      }
      break;

    case "add":
      await contactsOperations.addContact(name, email, phone);
      const newContactsList = await contactsOperations.listContacts();
      console.table(newContactsList);
      break;

    case "remove":
      const deletedProduct = await contactsOperations.removeContact(id);
      const listAfterDeleteContact = await contactsOperations.listContacts();
      console.table(listAfterDeleteContact);
      if (!deletedProduct) {
        throw new Error(`Contact with id=${id} not found`);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
