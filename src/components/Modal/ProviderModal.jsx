import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

const ProviderModal = ({
    isOpen,
    onClose,
    onCategorySelect,
    onCategoryClick,
    onSelectProvider,
    contextData,
    tags = [],
    categories = [],
    selectedCategoryIndex
}) => {
    const [query, setQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [view, setView] = useState('filter');
    const navigate = useNavigate();

    const location = useLocation();
    const isCasino = location.pathname === "/casino";

    useEffect(() => {
        if (!isOpen) {
            setView('filter');
            setQuery('');
            setShowSearch(false);
        }
    }, [isOpen]);

    const handleCategoryClick = (category, index) => {
        if (onCategoryClick) {
            onCategoryClick(category, category.id, category.table_name, index, true);
            navigate("#" + category.code)
        }
        if (onCategorySelect) {
            onCategorySelect(category, index);
        }
    };

    const handleBack = () => {
        if (view === 'provider-search') {
            setView('providers');
            setQuery('');
            setShowSearch(false);
        } else if (view === 'providers') {
            setView('filter');
            setShowSearch(false);
        } else {
            onClose();
        }
    };

    const filteredProviders = categories.filter(p =>
        p.name && p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <div className="modal modal-default fade all-providers-modal show" style={{ display: "block" }} onClick={onClose}>
            <div className="modal-dialog">
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <div className="modal-title"></div>
                        <button type="button" className="close" onClick={onClose}>
                            <span>Close</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="list-providers-container">
                            <ul className="list-providers beauty-scroll">
                                {categories.map((p, idx) => {
                                    const imageDataSrc = p.image_local != null
                                        ? contextData.cdnUrl + p.image_local
                                        : p.image_url;

                                    return (
                                        <li
                                            className="provider"
                                            key={p.id || idx}
                                            onClick={() => {
                                                onSelectProvider && onSelectProvider(p);
                                            }}
                                        >
                                            <div className="provider-data">
                                                <div className="provider-logo">
                                                    <img src={imageDataSrc} alt={p.name} />
                                                </div>
                                                <span className="provider-name">{p.name}</span>
                                            </div>
                                            <i className="fa-solid fa-fire-flame-curved fa-fw icon-promoted"></i>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderModal;