import React from 'react';
import './Button.css';

function Button({children, boolean, clickHandler}) {


    return (
        <section className="row">
            <button
                disabled={boolean}
                type="submit"
                onClick={clickHandler}
            >
                {children}
            </button>
        </section>
    )

}

export default Button;