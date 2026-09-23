import { createContext, useContext, useState } from 'react';
import StartProjectModal from '../components/StartProjectModal';

const ModalContext = createContext({
	openProjectModal: () => {},
	closeProjectModal: () => {}
});

export function ModalProvider({ children }) {
	const [isOpen, setIsOpen] = useState(false);
	const [initialData, setInitialData] = useState({});

	const openProjectModal = (data = {}) => {
		setInitialData(data);
		setIsOpen(true);
	};

	const closeProjectModal = () => {
		setIsOpen(false);
		setInitialData({});
	};

	return (
		<ModalContext.Provider value={{ openProjectModal, closeProjectModal }}>
			{children}
			<StartProjectModal isOpen={isOpen} onClose={closeProjectModal} initialData={initialData} />
		</ModalContext.Provider>
	);
}

export const useModal = () => useContext(ModalContext);
