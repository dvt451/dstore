import React from 'react'
import { useGlobalContext } from '../../../shared/hooks/GlobalProvider'

export default function ComparisonSideBar() {
	const { sidebarClose } = useGlobalContext()

	return (
		<div>ComparisonSideBar</div>
	)
}
