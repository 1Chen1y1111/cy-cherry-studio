import ChatGLMModelLogo from '@renderer/assets/images/models/chatglm.jpeg'
import ChatGPTModelLogo from '@renderer/assets/images/models/chatgpt.svg'
import DeepSeekModelLogo from '@renderer/assets/images/models/deepseek.png'
import GemmaModelLogo from '@renderer/assets/images/models/gemma.jpeg'
import LlamaModelLogo from '@renderer/assets/images/models/llama.jpeg'
import MixtralModelLogo from '@renderer/assets/images/models/mixtral.jpeg'
import QwenModelLogo from '@renderer/assets/images/models/qwen.jpeg'
import YiModelLogo from '@renderer/assets/images/models/yi.svg'
import DeepSeekProviderLogo from '@renderer/assets/images/providers/deepseek.png'
import GroqProviderLogo from '@renderer/assets/images/providers/groq.png'
import OpenAiProviderLogo from '@renderer/assets/images/providers/openai.jpeg'
import SiliconFlowProviderLogo from '@renderer/assets/images/providers/silicon.png'
import YiProviderLogo from '@renderer/assets/images/providers/yi.svg'

export function getProviderLogo(providerId: string) {
  if (providerId === 'openai') {
    return OpenAiProviderLogo
  }

  if (providerId === 'silicon') {
    return SiliconFlowProviderLogo
  }

  if (providerId === 'deepseek') {
    return DeepSeekProviderLogo
  }

  if (providerId === 'yi') {
    return YiProviderLogo
  }

  if (providerId === 'groq') {
    return GroqProviderLogo
  }

  return ''
}

export function getModelLogo(modelId: string) {
  const _modelId = modelId.toLowerCase()

  if (_modelId.includes('gpt')) {
    return ChatGPTModelLogo
  }

  if (_modelId.includes('glm')) {
    return ChatGLMModelLogo
  }

  if (_modelId.includes('deepseek')) {
    return DeepSeekModelLogo
  }

  if (_modelId.includes('qwen')) {
    return QwenModelLogo
  }

  if (_modelId.includes('gemma')) {
    return GemmaModelLogo
  }

  if (_modelId.includes('yi-')) {
    return YiModelLogo
  }

  if (_modelId.includes('llama')) {
    return LlamaModelLogo
  }

  if (_modelId.includes('mixtral')) {
    return MixtralModelLogo
  }

  return ''
}
