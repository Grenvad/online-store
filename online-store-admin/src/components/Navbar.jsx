import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <>
            <nav className="navbar_custom">
                <div className="title_block_custom">
                    <h2 className="title_custom">Админ-панель</h2>
                </div>
                <ul className="nav_custom">
                    <li className="nav_item_custom">
                        <Link to="/">Пользователи</Link>
                    </li>
                    <li className="nav_item_custom">
                        <Link to="/categories">Категории</Link>
                    </li>
                    <li className="nav_item_custom">
                        <Link to="/products">Продукты</Link>
                    </li>
                    <li className="nav_item_custom">
                        <Link to="/orders">Заказы</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
