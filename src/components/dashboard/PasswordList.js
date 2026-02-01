import React from "react";
import { usePasswords } from "../../context/PasswordContext";
import PasswordCard from "./PasswordCard";

const PasswordList = ({ onEdit }) => {
  const { passwords } = usePasswords();

  const styles = {
    list: {
      display: "grid",
      gap: "1rem",
    },
  };

  return (
    <div style={styles.list}>
      {passwords.map((entry) => (
        <PasswordCard key={entry.id} entry={entry} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default PasswordList;
