SELECT AssetID,AssetName,AssetTag, br.Brand,ast.ModelNo as Model,
ct.Category, sct.SubCategory, st.Site, lc.Location, d.Department
FROM asset ast
INNER JOIN brand br ON ast.BrandID = br.BrandID
INNER JOIN category ct ON ct.CategoryID =ast.CategoryID
INNER JOIN subcategory sct ON sct.SubCategoryID =ast.SubCategoryID
INNER JOIN sites st ON ast.CurrentSiteID = st.SiteID
INNER JOIN location lc ON lc.LocationID = ast.CurrentLocationID
INNER JOIN department d ON d.DeptID = ast.CurrentDeptID
where ast.AssetTag =?