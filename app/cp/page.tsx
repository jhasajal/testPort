'use client';
import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RefreshCw, X } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import the Monaco editor to avoid SSR issues
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

// Define the initial code for the Monaco editor
const initialCode = `#include <bits/stdc++.h>
#include <CP_Profile>

// Type predefined keywords between the quotes to open corresponding links:
// leetcode, codeforces, github, linkedin

void find() {
    string userInput = ""; //<--------Type Here
    // Key words are given above
}

int main() {
    int t = 1;
    while (t--) {
        find();
    }
    return 0;
}
`

// Map of predefined keywords and their corresponding links
const keywordLinks: Record<string, string> = {
  'leetcode': 'https://leetcode.com/problemset/all/',
  'codeforces': 'https://codeforces.com/problemset',
  'github': 'https://github.com/',
  'linkedin': 'https://www.linkedin.com/'
}

const Component: React.FC = () => {
  // State to manage the content of the Monaco editor
  const [editorContent, setEditorContent] = useState<string>(initialCode)
  // State to manage which link has been opened
  const [openedLink, setOpenedLink] = useState<string>('')

  // State to ensure that the code only runs on the client side
  const [isClient, setIsClient] = useState(false)

  // Ref to store the Monaco editor instance
  const editorRef = useRef<any>(null)

  // UseEffect hook to ensure client-side rendering
  useEffect(() => {
    setIsClient(true) // Mark the component as client-side
  }, [])

  // Editor mount handler, runs when Monaco editor is mounted
  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor

    editor.onDidChangeModelContent(() => {
      const currentContent = editor.getValue()
      const match = currentContent.match(/userInput = "(.*?)";/)
      if (match) {
        const userInput = match[1]
        // Check if the input matches a predefined keyword and open the corresponding link
        if (userInput.toLowerCase() in keywordLinks && isClient) {
          window.open(keywordLinks[userInput.toLowerCase()], '_blank')
          setOpenedLink(userInput.toLowerCase())
        } else {
          setOpenedLink('')
        }
      }
    })
  }

  // Reset the editor content to the initial code
  const resetEditor = () => {
    if (editorRef.current) {
      editorRef.current.setValue(initialCode)
      setOpenedLink('')
    }
  }

  // Ensure the component only renders on the client side
  if (!isClient) return null

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent p-4">
      <div className="w-[90%] max-w-4xl mx-auto">
        <div className="bg-grey rounded-lg shadow-lg overflow-hidden">
          {/* Browser mockup header */}
          <div className="bg-[#2d2d2d] py-2 flex items-center justify-between">
            <div className="flex-1 mx-4">
              <div className="bg-[#0d0d0d] hover:bg-[#e85839] rounded-full px-3 py-1 text-sm text-[#afa18f] hover:text-[#0d0d0d] text-center">
                <Link href="https://codolio.com/profile/Sajaljhaa">
                  https://Codolio.com/profile/Sajaljhaa
                </Link>
              </div>
            </div>
            <div className="flex space-x-2">
                <X className="w-6 h-6 pr-2 text-[#afa18f] " />
            </div>
          </div>

          {/* Editor content */}
          <Card className="rounded-none border-0">
            <CardHeader className="flex flex-row items-center justify-between bg-[#0d0d0d] text-[#afa18f] border-b border-[#2a2a2a]">
              <CardTitle className="text-[#e85839]">MyProfile.cpp</CardTitle>
              <Button
                onClick={resetEditor}
                className="bg-transparent text-[#afa18f] "
                aria-label="Reset editor"
                size="sm"
              >
                <RefreshCw className="h-2 w-2" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Editor
                height="400px"
                defaultLanguage="cpp"
                value={editorContent}
                onChange={(value) => setEditorContent(value || '')}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  readOnly: false,
                  theme: 'vs-dark', // Use the default Monaco dark theme
                  contextmenu: false,
                  quickSuggestions: false,
                  suggestOnTriggerCharacters: false,
                }}
              />
            </CardContent>
            <CardFooter className="flex justify-between bg-[#0d0d0d] text-[#afa18f] border-t border-[#2a2a2a]">
              <div>
                {openedLink && (
                  <p className="text-[#e85839]" aria-live="polite">
                    {openedLink.charAt(0).toUpperCase() + openedLink.slice(1)} opened!
                  </p>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Component
