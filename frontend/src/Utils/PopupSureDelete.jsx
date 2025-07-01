import React from "react";
import "@ant-design/v5-patch-for-react-19";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { useQuizCard } from "../Context/QuizCardCrudContext";
import toast from "react-hot-toast";
const { confirm } = Modal;

const PopupSureDelete = () => {
  const { deleteAllQuizCards,cardDelete, deleteSpecificQuizCard } = useQuizCard();

  const showAllDeleteConfirm = (subject) => {
    confirm({
      title: "Are you sure delete All Quiz Cards",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteAllQuizCards(subject);
      },
      onCancel() {
        toast(<p>Cancel Deletetation</p>);
      },
    });
  };

  const showSpecificDeleteConfirm = (id) => {
    confirm({
      title: "Delete this card?",
      icon: <ExclamationCircleFilled />,
      content: "This card will be removed from the set.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteSpecificQuizCard(id);
      },
      onCancel() {
        toast(<p>Cancel Deletetation</p>);
      },
    });
  };

 const DeleteCardobjeConfirm = (id) => {
    confirm({
      title: "Delete this Object?",
      icon: <ExclamationCircleFilled />,
      content: "This card will be removed from the set.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        cardDelete(id);
      },
      onCancel() {
        toast(<p>Cancel Deletetation</p>);
      },
    });
  };
  


  return {
    showAllDeleteConfirm,
    showSpecificDeleteConfirm,
    DeleteCardobjeConfirm
  };
};

export default PopupSureDelete;
