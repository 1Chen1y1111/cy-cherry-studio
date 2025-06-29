import ChatGLMModelLogo from '@renderer/assets/images/models/chatglm.jpeg'
import ChatGPTModelLogo from '@renderer/assets/images/models/chatgpt.jpeg'
import DeepSeekModelLogo from '@renderer/assets/images/models/deepseek.png'
import GemmaModelLogo from '@renderer/assets/images/models/gemma.jpeg'
import LlamaModelLogo from '@renderer/assets/images/models/llama.jpeg'
import MicrosoftModelLogo from '@renderer/assets/images/models/microsoft.png'
import MixtralModelLogo from '@renderer/assets/images/models/mixtral.jpeg'
import QwenModelLogo from '@renderer/assets/images/models/qwen.jpeg'
import YiModelLogo from '@renderer/assets/images/models/yi.svg'
import DeepSeekProviderLogo from '@renderer/assets/images/providers/deepseek.png'
import GroqProviderLogo from '@renderer/assets/images/providers/groq.png'
import MoonshotProviderLogo from '@renderer/assets/images/providers/moonshot.jpeg'
import MoonshotModelLogo from '@renderer/assets/images/providers/moonshot.jpeg'
import OllamaProviderLogo from '@renderer/assets/images/providers/ollama.png'
import OpenAiProviderLogo from '@renderer/assets/images/providers/openai.jpeg'
import OpenRouterProviderLogo from '@renderer/assets/images/providers/openrouter.png'
import SiliconFlowProviderLogo from '@renderer/assets/images/providers/silicon.png'
import YiProviderLogo from '@renderer/assets/images/providers/yi.svg'
import ZhipuProviderLogo from '@renderer/assets/images/providers/zhipu.png'

export function getProviderLogo(providerId: string) {
  switch (providerId) {
    case 'openai':
      return OpenAiProviderLogo
    case 'silicon':
      return SiliconFlowProviderLogo
    case 'deepseek':
      return DeepSeekProviderLogo
    case 'yi':
      return YiProviderLogo
    case 'groq':
      return GroqProviderLogo
    case 'zhipu':
      return ZhipuProviderLogo
    case 'ollama':
      return OllamaProviderLogo
    case 'moonshot':
      return MoonshotProviderLogo
    case 'openrouter':
      return OpenRouterProviderLogo
    default:
      return undefined
  }
}

export function getModelLogo(modelId: string) {
  const logoMap = {
    gpt: ChatGPTModelLogo,
    glm: ChatGLMModelLogo,
    deepseek: DeepSeekModelLogo,
    qwen: QwenModelLogo,
    gemma: GemmaModelLogo,
    'yi-': YiModelLogo,
    llama: LlamaModelLogo,
    mixtral: MixtralModelLogo,
    mistral: MixtralModelLogo,
    moonshot: MoonshotModelLogo,
    phi: MicrosoftModelLogo
  }

  for (const key in logoMap) {
    if (modelId.toLowerCase().includes(key)) {
      return logoMap[key]
    }
  }

  return ''
}
