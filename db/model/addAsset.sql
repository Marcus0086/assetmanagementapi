INSERT into asset(
	ClientID,AssetName,Description,AssetTag,MaterialCode,SerialNo,BrandID,
    ModelNo,PurchaseDate,PurchaseFrom,PurchaseCost,PONo,PRNo,OwnerSiteID,OwnerLocationID,
    OwnerDeptID,CurrentSiteID,CurrentLocationID,CategoryID,SubCategoryID,DepreciationID,
    CurrentStatus,AssetCondition
)
VALUES(
	:ClientID,:AssetName,:Description,:AssetTag,:MaterialCode,:SerialNo,:BrandID,
    :ModelNo,:PurchaseDate,:PurchaseFrom,:PurchaseCost,:PONo,:PRNo,:OwnerSiteID,:OwnerLocationID,
    :OwnerDeptID,:CurrentSiteID,:CurrentLocationID,:CategoryID,:SubCategoryID,:DepreciationID,
    :CurrentStatus,:AssetCondition
)