import ModelModel from "../models/Model.js";

// Init supported AI models, can comment after running the first time
const models = [
    {
        model_name: "gpt-4o",
        service: "OPENAI",
        input_limit: 131072,
        output_limit: 16384,
        best_for: "General-purpose conversational AI, code generation, complex reasoning, and content creation",
        use_case: "Build a chatbot, generate code, write articles, and more",
        knowledge_cutoff: new Date("2023-10-01"),
        rate_limit: null
    },
    {
        model_name: "gpt-4o-mini",
        service: "OPENAI",
        input_limit: 131072,
        output_limit: 16384,
        best_for: "General-purpose conversational AI, code generation, complex reasoning, and content creation",
        use_case: "Build a chatbot, generate code, write articles, and more",
        knowledge_cutoff: new Date("2023-10-01"),
        rate_limit: 3
    },
    {
        model_name: "Phi-3.5-MoE-instruct",
        service: "GITHUB",
        input_limit: 131072,
        output_limit: 4096,
        best_for: "Instruction-following tasks, lightweight deployments, and text generation",
        use_case: "Create AI assistants, low-latency applications, long-context generation, and more",
        knowledge_cutoff: new Date("2023-10-31"),
        rate_limit: 15
    },
    {
        model_name: "Phi-3.5-mini-instruct",
        service: "GITHUB",
        input_limit: 131072,
        output_limit: 4096,
        best_for: "Instruction-following tasks, lightweight deployments, and text generation",
        use_case: "Create AI assistants, low-latency applications, long-context generation, and more",
        knowledge_cutoff: new Date("2023-10-31"),
        rate_limit: 15
    },
    {
        model_name: "Phi-3-medium-128k-instruct",
        service: "GITHUB",
        input_limit: 131072,
        output_limit: 4096,
        best_for: "Instruction-following tasks, lightweight deployments, and text generation",
        use_case: "Create AI assistants, low-latency applications, long-context generation, and more",
        knowledge_cutoff: new Date("2023-10-31"),
        rate_limit: 15
    },
    {
        model_name: "Phi-3-mini-128k-instruct",
        service: "GITHUB",
        input_limit: 131072,
        output_limit: 4096,
        best_for: "Instruction-following tasks, lightweight deployments, and text generation",
        use_case: "Create AI assistants, low-latency applications, long-context generation, and more",
        knowledge_cutoff: new Date("2023-10-31"),
        rate_limit: 15
    },
    {
        model_name: "Phi-3-small-128k-instruct",
        service: "GITHUB",
        input_limit: 131072,
        output_limit: 4096,
        best_for: "Instruction-following tasks, lightweight deployments, and text generation",
        use_case: "Create AI assistants, low-latency applications, long-context generation, and more",
        knowledge_cutoff: new Date("2023-10-31"),
        rate_limit: 15
    },
    {
        model_name: "AI21-Jamba-1.5-Large",
        service: "GITHUB",
        input_limit: 262144,
        output_limit: 4096,
        best_for: "Long-form content generation, reasoning, and document summarization",
        use_case: "Write articles, generate long-form content, summarize documents, enhance UX in applications with advanced NLP, and more",
        knowledge_cutoff: new Date("2024-03-05"),
        rate_limit: 10
    },
    {
        model_name: "AI21-Jamba-1.5-Mini",
        service: "GITHUB",
        input_limit: 262144,
        output_limit: 4096,
        best_for: "Long-form content generation, reasoning, and document summarization",
        use_case: "Write articles, generate long-form content, summarize documents, enhance UX in applications with advanced NLP, and more",
        knowledge_cutoff: new Date("2024-03-05"),
        rate_limit: 15
    },
    {
        model_name: "Meta-Llama-3-70B-Instruct",
        service: "GITHUB",
        input_limit: 8192,
        output_limit: 4096,
        best_for: "Advanced reasoning, fine-tuned domain-specific applications, and scaling across multiple tasks",
        use_case: "Build enterprise AI applications, train custom models, research, and more",
        knowledge_cutoff: new Date("2023-12-31"),
        rate_limit: 10
    },
    {
        model_name: "Meta-Llama-3.1-8B-Instruct",
        service: "GITHUB SAMBANOVA",
        input_limit: 131072,
        output_limit: 4096,
        best_for: "Advanced reasoning, fine-tuned domain-specific applications, and scaling across multiple tasks",
        use_case: "Build enterprise AI applications, train custom models, research, and more",
        knowledge_cutoff: new Date("2023-12-31"),
        rate_limit: 15
    },
    {
        model_name: "Meta-Llama-3.1-70B-Instruct",
        service: "GITHUB SAMBANOVA",
        input_limit: 131072,
        output_limit: 4096,
        best_for: "Advanced reasoning, fine-tuned domain-specific applications, and scaling across multiple tasks",
        use_case: "Build enterprise AI applications, train custom models, research, and more",
        knowledge_cutoff: new Date("2023-12-31"),
        rate_limit: 10
    },
    {
        model_name: "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF",
        service: "GLHF",
        input_limit: 131072,
        output_limit: 4096,
        best_for: "High-performance inference and fine-tuning for industry applications",
        use_case: "Run large-scale AI models, real-time decision-making or high-throughput applications, and more",
        knowledge_cutoff: new Date("2022-12-31"),
        rate_limit: 30
    },
    {
        model_name: "Meta-Llama-3.1-405B-Instruct",
        service: "GITHUB SAMBANOVA GLHF",
        input_limit: 131072,
        output_limit: 4096,
        best_for: "Advanced reasoning, fine-tuned domain-specific applications, and scaling across multiple tasks",
        use_case: "Build enterprise AI applications, train custom models, research, and more",
        knowledge_cutoff: new Date("2023-12-31"),
        rate_limit: 10
    },
    {
        model_name: "mlabonne/Llama-3.1-70B-Instruct-lorablated",
        service: "GLHF",
        input_limit: 131072,
        output_limit: 131072,
        best_for: "Advanced reasoning, fine-tuned domain-specific applications, and scaling across multiple tasks",
        use_case: "Build enterprise AI applications, train custom models, research, and more",
        knowledge_cutoff: new Date("2023-12-31"),
        rate_limit: null
    },
    {
        model_name: "meta-llama/Llama-3.3-70B-Instruct",
        service: "GLHF",
        input_limit: 131072,
        output_limit: 131072,
        best_for: "Advanced reasoning, fine-tuned domain-specific applications, and scaling across multiple tasks",
        use_case: "Build enterprise AI applications, train custom models, research, and more",
        knowledge_cutoff: new Date("2023-12-31"),
        rate_limit: null
    },
    {
        model_name: "Meta-Llama-3.3-70B-Instruct",
        service: "SAMBANOVA",
        input_limit: 65536,
        output_limit: 2048,
        best_for: "Advanced reasoning, fine-tuned domain-specific applications, and scaling across multiple tasks",
        use_case: "Build enterprise AI applications, train custom models, research, and more",
        knowledge_cutoff: new Date("2023-12-31"),
        rate_limit: null
    },
    {
        model_name: "Mistral-Nemo",
        service: "GITHUB",
        input_limit: 131072,
        output_limit: 4096,
        best_for: "High-parallelism inference tasks and distributed AI workloads",
        use_case: "Solution requiring high-parallelism, applications requiring seamless scaling, DPO workflows, and more",
        knowledge_cutoff: new Date("2021-08-31"),
        rate_limit: 15
    },
    {
        model_name: "Mistral-large",
        service: "GITHUB",
        input_limit: 32768,
        output_limit: 4096,
        best_for: "High-parallelism inference tasks and distributed AI workloads",
        use_case: "Solution requiring high-parallelism, applications requiring seamless scaling, DPO workflows, and more",
        knowledge_cutoff: new Date("2023-08-31"),
        rate_limit: 15
    },
    {
        model_name: "Mistral-large-2407",
        service: "GITHUB",
        input_limit: 131072,
        output_limit: 4096,
        best_for: "High-parallelism inference tasks and distributed AI workloads",
        use_case: "Solution requiring high-parallelism, applications requiring seamless scaling, DPO workflows, and more",
        knowledge_cutoff: new Date("2023-10-31"),
        rate_limit: 10
    },
    {
        model_name: "mistralai/Mistral-7B-Instruct-v0.3",
        service: "GLHF",
        input_limit: 32768,
        output_limit: 4096,
        best_for: "High-parallelism inference tasks and distributed AI workloads",
        use_case: "Solution requiring high-parallelism, applications requiring seamless scaling, DPO workflows, and more",
        knowledge_cutoff: new Date("2021-08-31"),
        rate_limit: null
    },
    {
        model_name: "Mixtral-8x7B-Instruct-v0.1",
        service: "GLHF",
        input_limit: 32768,
        output_limit: 2048,
        best_for: "High-parallelism inference tasks and distributed AI workloads",
        use_case: "Solution requiring high-parallelism, applications requiring seamless scaling, DPO workflows, and more",
        knowledge_cutoff: new Date("2023-12-31"),
        rate_limit: null
    },
    {
        model_name: "Mixtral-8x22B-Instruct-v0.1",
        service: "GLHF",
        input_limit: 65536,
        output_limit: 2048,
        best_for: "High-parallelism inference tasks and distributed AI workloads",
        use_case: "Solution requiring high-parallelism, applications requiring seamless scaling, DPO workflows, and more",
        knowledge_cutoff: new Date("2021-09-31"),
        rate_limit: null
    },
    {
        model_name: "Nous-Hermes-2-Mixtral-8x7B-DPO",
        service: "GLHF",
        input_limit: 32768,
        output_limit: 2048,
        best_for: "High-parallelism inference tasks and distributed AI workloads",
        use_case: "Solution requiring high-parallelism, applications requiring seamless scaling, DPO workflows, and more",
        knowledge_cutoff: new Date("2023-12-31"),
        rate_limit: null
    },
    {
        model_name: "Qwen2-72B-Instruct",
        service: "GLHF",
        input_limit: 131072,
        output_limit: 8192,
        best_for: "High-complexity reasoning, coding, and multi-modal learning",
        use_case: "Build AI tools, large-scale virtual assistants, implement cutting-edge intruction-based AI applications, and more",
        knowledge_cutoff: new Date("2023-12-31"),
        rate_limit: null
    },
    {
        model_name: "QwQ-32B-Preview",
        service: "SAMBANOVA GLHF",
        input_limit: 32768,
        output_limit: 32768,
        best_for: "High-complexity reasoning, coding, and multi-modal learning",
        use_case: "Build AI tools, large-scale virtual assistants, implement cutting-edge intruction-based AI applications, and more",
        knowledge_cutoff: new Date("2024-11-28"),
        rate_limit: null
    },
    {
        model_name: "Qwen2.5-Coder-32B-Instruct",
        service: "SAMBANOVA GLHF",
        input_limit: 131072,
        output_limit: 131072,
        best_for: "High-complexity reasoning, coding, and multi-modal learning",
        use_case: "Build AI tools, large-scale virtual assistants, implement cutting-edge intruction-based AI applications, and more",
        knowledge_cutoff: new Date("2024-03-31"),
        rate_limit: null
    },
    {
        model_name: "Qwen2.5-72B-Instruct",
        service: "SAMBANOVA GLHF",
        input_limit: 131072,
        output_limit: 8192,
        best_for: "High-complexity reasoning, coding, and multi-modal learning",
        use_case: "Build AI tools, large-scale virtual assistants, implement cutting-edge intruction-based AI applications, and more",
        knowledge_cutoff: new Date("2024-09-19"),
        rate_limit: null
    },
    {
        model_name: "gemma-2-9b-it",
        service: "GLHF GROQ",
        input_limit: 8192,
        output_limit: 8192,
        best_for: "Italian language processing, multilingual tasks, and lightweight AI solutions",
        use_case: "Build AI solutions for Italian language, multilingual applications, optimize NLP tasks in European languages, and more",
        knowledge_cutoff: new Date("2024-06-27"),
        rate_limit: null
    },
    {
        model_name: "gemma-2-27b-it",
        service: "GLHF",
        input_limit: 8192,
        output_limit: 8192,
        best_for: "Italian language processing, multilingual tasks, and lightweight AI solutions",
        use_case: "Build AI solutions for Italian language, multilingual applications, optimize NLP tasks in European languages, and more",
        knowledge_cutoff: new Date("2024-06-27"),
        rate_limit: null
    }
];

async function initModels() {
    try {
        await ModelModel.insertMany(models);
        console.log("Models initialized successfully");
    } catch (err) {
        console.error("Models already initialized");
    }
};

export default initModels;