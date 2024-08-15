import { React } from "react";
import { CustomModal } from "../../components/common/custom-modal/CustomModal";
import { useCustomModal } from "../../Hooks/useCustomModal";
import AddNewSubCategory from "../../components/forms/AddNewSubCategory";
import SubCategoryTable from "../../components/tables/SubCategoryTable";

const SubCategoryPage = () => {
  const { show, setShow } = useCustomModal();

  return (
    <div>
      <h2>Sub-Categories</h2>
      <hr />

      <CustomModal title="Add New Sub-Category" show={show} setShow={setShow}>
        <AddNewSubCategory setShow={setShow} />
      </CustomModal>
      <SubCategoryTable />
    </div>
  );
};

export default SubCategoryPage;
