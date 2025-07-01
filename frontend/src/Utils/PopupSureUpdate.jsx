import React, { useState, useEffect } from "react";
import { Modal, Input } from "antd";

const PopupSureUpdate = ({ isOpen, onClose, onConfirm, initialTitle }) => {
    const [newTitle, setNewTitle] = useState(initialTitle || "");

    useEffect(() => {
        setNewTitle(initialTitle || "");
    }, [initialTitle]);

    const handleOk = () => {
        if (newTitle.trim() === "") return;
        onConfirm(newTitle);
        onClose();
    };

    return (
        <Modal
            title="Update Quiz Title"
            open={isOpen}
            onOk={handleOk}
            onCancel={onClose}
            okText="Update"
            cancelText="Cancel"
            okButtonProps={{ disabled: newTitle.trim() === "" }}
        >
            <Input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter new quiz title"
                required
            />
        </Modal>
    );
};

export default PopupSureUpdate;