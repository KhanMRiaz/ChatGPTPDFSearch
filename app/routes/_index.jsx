export const meta = () => { return [{ title: "ChatGPT PDF POC" }]}
import { FileInput, Card, Text, Badge, TextInput, Button, Group, Box } from '@mantine/core'
import { IconUpload } from '@tabler/icons-react'
import { useForm } from '@mantine/form'
import { useState } from 'react' 

export default function Index() {
  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')
  const [submittingQuestion, setSubmittingQuestion] = useState(false)
  const [fileValue, setFileValue] = useState()
  const [uploadingPDF, setUploadingPDF] = useState(false)

  const form = useForm({
    initialValues: {
      question: ''
    },

    validate: {
      question: (value) => (value.length < 5 ? 'Question Too Short' : null),
    },
  });

  const onSubmit = async (values) => {
    setSubmittingQuestion(true)
    const res = await fetch(`https://chatgptpoc.eastmanenterprises.com/api/ask-chatgpt?question=${values.question}`)
    setSubmittingQuestion(false)
    const answer =  await res.json() 
    setAnswer(answer[0])
    setQuestion(values.question)
  }

  const onClear = () => {
    setAnswer('')
    setQuestion('')
    form.setValues({ question: '' })
  }

  const uploadPDF = async () => {
    setUploadingPDF(true)
    const fd = new FormData();
    fd.append("file", fileValue);
    await fetch('https://chatgptpoc.eastmanenterprises.com/api/upload', {
      method: 'POST',
      body: fd
    });
    setUploadingPDF(false)
    setFileValue(null)
  }

  return (
    <Box maw={900} mx="auto" mt={20}>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          radius='sm'
          size='md'
          withAsterisk
          label="Question"
          placeholder="Ask me anything"
          {...form.getInputProps('question')}
        />
        <Group position="right" mt="md">
        <Button variant='outline' radius='sm' onClick={()=>onClear()}>Clear</Button>
          <Button type="submit" radius='sm' loading={submittingQuestion}>Submit</Button>
        </Group>
      </form>

      {answer.length > 0 && <Card shadow="sm" padding="sm" radius="md" withBorder maw={500}>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{question}</Text>
          <Badge color="pink" variant="light">
            Top Answer
          </Badge>
        </Group>
        <Text size="sm" color="dimmed">{answer}</Text>
      </Card>}
    
      <FileInput 
        value={fileValue} 
        onChange={setFileValue} 
        size='md'
        radius='sm'
        mt={20} 
        label="PDF" 
        placeholder="Upload PDF" 
        icon={<IconUpload size={14} 
        position="right"
        />} 
      />
      <Group position="right" mt="md">
        <Button radius='sm' loading={uploadingPDF} onClick={()=>uploadPDF()}>Upload PDF</Button>
      </Group>
    </Box>
  );
}