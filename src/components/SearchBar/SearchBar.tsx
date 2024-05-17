import React from "react";
import toast from "react-hot-toast";

interface SearchBarProps {
  onSubmit: (topic: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const topic = (
      form.elements.namedItem("search") as HTMLInputElement
    ).value.trim();

    if (!topic) {
      toast.error("Please enter a search query.");
      return;
    }

    onSubmit(topic);
    form.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
