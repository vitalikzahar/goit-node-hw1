const Contacts = require("./contacts");

const program = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-l, --action <list>", "list contacts")
  .option("-g, --id <get>", "get contact by id")
  .option("-d, --name <add>", "user name")
  .option("-e, --email <remove>", "user email")
  .option("-p, --phone <remove>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await Contacts.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const contactAdd = await Contacts.addContact(name, email, phone);
      console.log(contactAdd);
      break;

    case "remove":
      const contactRemove = await Contacts.removeContact(id);
      console.log(contactRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
