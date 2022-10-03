import React from 'react';
import './Button.css';

function Button({children, boolean, clickHandler}) {


    return (

            <button
                disabled={boolean}
                type="submit"
                onClick={clickHandler}
            >
                {children}
            </button>

    )

}

export default Button;