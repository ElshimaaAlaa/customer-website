import Pagination from "@mui/material/Pagination";

export default function ProductsPagination({
  totalPages,
  currentPage,
  setCurrentPage,
  isRTL,
}) {
  return (
    <div className="flex justify-center mt-10">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => setCurrentPage(page)}
        color="primary"
        dir={isRTL ? "rtl" : "ltr"}
        sx={{
          direction: isRTL ? "rtl" : "ltr",
          "& .MuiPaginationItem-root": {
            color: "#E0A75E",
            borderColor: "#E0A75E",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#E0A75E",
            color: "white",
            "&:hover": {
              backgroundColor: "#D19B54",
            },
          },
          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#F5E9D9",
          },
          "& .MuiPaginationItem-previousNext": {
            transform: isRTL ? "scaleX(-1)" : "none",
          },
        }}
      />
    </div>
  );
}
