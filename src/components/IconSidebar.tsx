import React from 'react';

interface Props{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element
    label: string
    onClick?: () => void
}

function IconSidebar({icon: Icon, label, onClick}: Props) {
    return(
        <div 
        className='flex items-center space-x-2 hover:text-white cursor-pointer'
        onClick={onClick}
        >
			<Icon className='icon' />
			<span>{label}</span>
		</div>
    )
}

export default IconSidebar