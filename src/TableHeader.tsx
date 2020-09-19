import React from 'react';

export default function TableHeader({header}: any) {
	const cls:string = (header.isSortColumn ? "selectedForSort" : "");
	return <th className={cls}>{header.name}</th>;
}