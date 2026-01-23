import { AIModelAvailability } from '@/hooks/use-check-ai'
import { checkAiStatus } from '@/lib/utils'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { CodeSnippet } from './codeSnippet'
import { FlagAccordion } from './flagTable'
import { IncompatibleBrowserAlert } from './incompatibleAlert'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from './ui/dialog'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'

export function ErrorModal({
	error,
	trigger,
}: {
	error?: string | null
	trigger?: React.ReactNode
}) {
	const [selectedAccordionValue, setSelectedSelectedAccordionValue] = useState<
		string | undefined
	>()

	const [open, setOpen] = useState(!!error)
	useEffect(() => {
		setOpen(!!error);
	}, [error])
	const [state, setState] = useState<AIModelAvailability | null>(null)
	const [hasAi, setHasAi] = useState(false)

	const checkStatus = async () => {
		setState(null)
		const state = await checkAiStatus()

		setState(state)
		if (state === 'available') {
			location.reload()
		}
	}

	useEffect(() => {
		setHasAi(!!window.ai)
		if (open) {
			checkStatus()
		}
	}, [open])

	const openInstructions = () => setSelectedSelectedAccordionValue('item-4')
	const showSupportedBrowsers = () =>
		setSelectedSelectedAccordionValue('item-3')

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogOverlay className='bg-black/10 backdrop-blur-sm' />
			{trigger && <DialogTrigger>{trigger}</DialogTrigger>}
			<DialogContent className='sm:h-fit h-full flex flex-col sm:block sm:max-h-screen sm:justify-center py-4 sm:px-8 max-w-2xl overflow-y-scroll'>
				<DialogTitle className='text-3xl text-center mb-4'>
					ChromeAI Gemini Chatbot
				</DialogTitle>
				{hasAi && (
					<div className='flex justify-center items-center gap-4'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger tabIndex={-1}>
									<div>
										Your <CodeSnippet>window.ai</CodeSnippet>
										{"'s"} status:
										<Badge className='text-base ml-2'>{state}</Badge>
									</div>
								</TooltipTrigger>
								<TooltipContent>
									<p>all statuses: readily, after-download, no </p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<Button tabIndex={-1} size='sm' onClick={checkStatus}>
							Recheck
						</Button>
					</div>
				)}
				<div className='w-full pt-2 space-y-2'>
					{error ? (
						<IncompatibleBrowserAlert
							error={error}
							openInstructions={openInstructions}
							showSupportedBrowsers={showSupportedBrowsers}
						/>
					) : null}
					<FlagAccordion
						value={selectedAccordionValue}
						setValue={setSelectedSelectedAccordionValue}
					/>
				</div>
			</DialogContent>
		</Dialog>
	)
}
