import { List, ListItem } from "./styles";

type ContactsComponentProps = {
  children: React.ReactNode[];
};

const ContactsComponent = ({ children }: ContactsComponentProps) => {
  return (
    <List>
      {children.map((element) => (
        <ListItem>{element}</ListItem>
      ))}
    </List>
  );
};

export default ContactsComponent;
