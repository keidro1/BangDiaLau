import React from 'react';

interface Props{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element
    label: string
}

function IconSidebar({icon: Icon, label}: Props) {
    return(
        <div className='flex items-center space-x-2 hover:text-white'>
			<Icon className='icon' />
			<span>{label}</span>
		</div>
    )
}

export default IconSidebar