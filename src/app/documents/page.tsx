import { Button } from '@/components/ui/button'
import Link from 'next/link'

const DocumentPage = () => {
    return (
        <div className='bg-background min-h-screen flex justify-center items-center gap-4'>
            DocumentPage 
            <Button>
                <Link href={'/documents/123'}>
                    next
                </Link>
            </Button>
        </div>

    )
}

export default DocumentPage