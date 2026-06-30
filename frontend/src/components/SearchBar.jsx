import { useState } from "react";

const SearchBar = ({ onSearch }) => {

    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        onSearch(search);

    };

    return (

        <form
            onSubmit={handleSubmit}
            style={{
                marginBottom: "20px",
            }}
        >

            <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

        </form>

    );

};

export default SearchBar;