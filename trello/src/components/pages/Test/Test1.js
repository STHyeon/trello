import React, { useState } from "react";

const search_results = [
    { id: 0, text: "Foo bar", comment: "This is rad" },
    { id: 1, text: "Baz qux", comment: "This is nice" },
];

const A = ({ open, openClick }) => {
    console.log(open);
    return <>{open ? <li onClick={openClick}>open</li> : <li onClick={openClick}>false</li>}</>;
};

function Test1() {
    const [state, setState] = useState({});
    console.log(state);

    const handleClick = (id) => {
        setState((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
        console.log(state);
    };

    return (
        <div>
            <ul>
                {search_results.map((option, i) => (
                    <li key={i} onClick={() => handleClick(option.id)}>
                        {option.text}
                        {state[option.id] ? <p>{option.comment}</p> : null}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Test1;
