
SELECT AuditPeriodID,AuditByUserID,u.Name as AuditByName, AuditCompletedOn as AuditDate,au.AssetID,ass.AssetName,ass.AssetTag,
br.Brand,ass.ModelNo as model,cat.Category,sub.SubCategory,au.IsApproved as detailsmodified, sts.Site as oldsite,
st.Site as newsite, lc.Location as oldlocation,lc.Location as newlocation, dpts.Department as olddepartment, 
dpt.Department as newdepartment,au.OldIssuedTo, au.NewIssuedTo
from assetaudit au 
INNER JOIN user u ON au.AuditByUserID=u.UserID
INNER JOIN asset ass ON ass.AssetID=au.AssetID
INNER JOIN brand br ON ass.BrandID=br.BrandID
INNER JOIN category cat ON ass.CategoryID=cat.CategoryID
INNER JOIN subcategory sub ON ass.SubCategoryID=sub.SubCategoryID
INNER JOIN department dpts On dpts.DeptID=au.OldDeptID
INNER JOIN department dpt ON au.NewDeptID=dpt.DeptID
INNER JOIN sites sts ON sts.SiteID=au.OldSiteID
INNER JOIN sites st ON st.SiteID=au.NewSiteID
INNER JOIN location lc ON lc.LocationID=au.OldLocationID
WHERE AuditByUserID=:auid