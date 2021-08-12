select AssetID from asset ass INNER JOIN category cat ON ass.CategoryID=cat.CategoryID
INNER JOIN subcategory su ON ass.SubCategoryID=su.SubCategoryID 
WHERE ass.AssetName=:AssetName AND cat.Category=:Category AND su.SubCategory=:SubCategory