import React from 'react'
import { useFilter } from '../../shared/hooks/FilterProvider'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../shared/hooks/GlobalProvider'

export default function ToFilterPage({ text, nameClass }) {
	const { resetAll } = useFilter()
	const navigate = useNavigate()
	const { sidebarClose } = useGlobalContext()
	return (
		<button onClick={() => {
			sidebarClose()
			resetAll()
			navigate('/shop')
		}} className={`${nameClass}`}>{text}</button>
	)
}
