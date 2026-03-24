/**
 * Lambda Apps - Internationalization (i18n) System
 * Supports: English (en), Portuguese (pt), Spanish (es), German (de), Russian (ru), Chinese (zh)
 * Easy to add new languages by extending the translations object
 */

const I18N = (function() {
    'use strict';

    // Available languages with their display names
    const LANGUAGES = {
        en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
        pt: { name: 'Português', flag: '🇧🇷', dir: 'ltr' },
        es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
        de: { name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
        ru: { name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
        zh: { name: '中文', flag: '🇨🇳', dir: 'ltr' }
    };

    // Default language
    const DEFAULT_LANG = 'en';

    // Storage key for persisting language choice
    const STORAGE_KEY = 'lambda-apps-language';

    // Translations object - organized by section/page
    const TRANSLATIONS = {
        // Navigation
        nav: {
            services: {
                en: 'Services',
                pt: 'Serviços',
                es: 'Servicios',
                de: 'Dienstleistungen',
                ru: 'Услуги',
                zh: '服务'
            },
            work: {
                en: 'Work',
                pt: 'Trabalhos',
                es: 'Trabajos',
                de: 'Arbeiten',
                ru: 'Работы',
                zh: '作品'
            },
            github: {
                en: 'GitHub',
                pt: 'GitHub',
                es: 'GitHub',
                de: 'GitHub',
                ru: 'GitHub',
                zh: 'GitHub'
            },
            about: {
                en: 'About',
                pt: 'Sobre',
                es: 'Sobre',
                de: 'Über',
                ru: 'О нас',
                zh: '关于'
            },
            contact: {
                en: 'Contact',
                pt: 'Contato',
                es: 'Contacto',
                de: 'Kontakt',
                ru: 'Контакты',
                zh: '联系'
            }
        },

        // Hero Section
        hero: {
            eyebrow: {
                en: 'Fullstack Development Studio',
                pt: 'Estúdio de Desenvolvimento Fullstack',
                es: 'Estudio de Desarrollo Fullstack',
                de: 'Fullstack Entwicklungsstudio',
                ru: 'Студия Fullstack-разработки',
                zh: '全栈开发工作室'
            },
            title: {
                line1: {
                    en: 'ARCHITECTING',
                    pt: 'ARQUITETANDO',
                    es: 'ARQUITECTANDO',
                    de: 'ARCHITEKTUR',
                    ru: 'ПРОЕКТИРУЕМ',
                    zh: '构建'
                },
                line2: {
                    en: 'SCALABLE',
                    pt: 'ESCALÁVEIS',
                    es: 'ESCALABLES',
                    de: 'SKALIERBARE',
                    ru: 'МАСШТАБИРУЕМЫЕ',
                    zh: '可扩展的'
                },
                line3: {
                    en: 'SYSTEMS',
                    pt: 'SISTEMAS',
                    es: 'SISTEMAS',
                    de: 'SYSTEME',
                    ru: 'СИСТЕМЫ',
                    zh: '系统'
                }
            },
            subtitle: {
                en: 'Senior developer with 10+ years of experience deploying production-grade applications. From multi-cloud AI systems (Vertex AI, Bedrock, Azure OpenAI) to real-time audio processing.',
                pt: 'Desenvolvedor sênior com 10+ anos de experiência implantando aplicações de nível corporativo. De sistemas de IA multi-cloud (Vertex AI, Bedrock, Azure OpenAI) a processamento de áudio em tempo real.',
                es: 'Desarrollador senior con 10+ años de experiencia implementando aplicaciones de nivel empresarial. Desde sistemas de IA multi-cloud (Vertex AI, Bedrock, Azure OpenAI) hasta procesamiento de audio en tiempo real.',
                de: 'Senior-Entwickler mit 10+ Jahren Erfahrung in der Bereitstellung von Enterprise-Anwendungen. Von Multi-Cloud-KI-Systemen (Vertex AI, Bedrock, Azure OpenAI) bis zur Echtzeit-Audiobearbeitung.',
                ru: 'Старший разработчик с 10+ годами опыта внедрения корпоративных приложений. От мультиоблачных ИИ-систем (Vertex AI, Bedrock, Azure OpenAI) до обработки аудио в реальном времени.',
                zh: '拥有10年以上经验的高级开发工程师，部署企业级应用。从多云AI系统（Vertex AI、Bedrock、Azure OpenAI）到实时音频处理。'
            },
            cta: {
                primary: {
                    en: 'Start a Project',
                    pt: 'Iniciar Projeto',
                    es: 'Iniciar Proyecto',
                    de: 'Projekt starten',
                    ru: 'Начать проект',
                    zh: '开始项目'
                },
                secondary: {
                    en: 'View Work',
                    pt: 'Ver Trabalhos',
                    es: 'Ver Trabajos',
                    de: 'Arbeiten ansehen',
                    ru: 'Смотреть работы',
                    zh: '查看作品'
                }
            },
            stats: {
                years: {
                    en: 'Years Experience',
                    pt: 'Anos de Experiência',
                    es: 'Años de Experiencia',
                    de: 'Jahre Erfahrung',
                    ru: 'Лет опыта',
                    zh: '年经验'
                },
                projects: {
                    en: 'Projects Delivered',
                    pt: 'Projetos Entregues',
                    es: 'Proyectos Entregados',
                    de: 'Projekte geliefert',
                    ru: 'Выполненных проектов',
                    zh: '交付项目'
                },
                technologies: {
                    en: 'Core Technologies',
                    pt: 'Tecnologias Core',
                    es: 'Tecnologías Core',
                    de: 'Kerntechnologien',
                    ru: 'Ключевые технологии',
                    zh: '核心技术'
                }
            }
        },

        // Services Section
        services: {
            eyebrow: {
                en: 'What We Do',
                pt: 'O Que Fazemos',
                es: 'Lo Que Hacemos',
                de: 'Was Wir Machen',
                ru: 'Что мы делаем',
                zh: '我们的服务'
            },
            title: {
                en: 'Services',
                pt: 'Serviços',
                es: 'Servicios',
                de: 'Dienstleistungen',
                ru: 'Услуги',
                zh: '服务'
            },
            desc: {
                en: 'Specialized expertise across the full stack, from AI integration to cloud architecture.',
                pt: 'Expertise especializada em toda a stack, desde integração de IA até arquitetura cloud.',
                es: 'Experiencia especializada en toda la stack, desde integración de IA hasta arquitectura cloud.',
                de: 'Spezialisierte Expertise im gesamten Stack, von KI-Integration bis Cloud-Architektur.',
                ru: 'Специализированная экспертиза во всем стеке: от интеграции ИИ до облачной архитектуры.',
                zh: '全栈专业技能，从AI集成到云架构。'
            },
            items: {
                ai: {
                    title: {
                        en: 'AI & LLM Integration',
                        pt: 'Integração de IA & LLM',
                        es: 'Integración de IA & LLM',
                        de: 'KI & LLM Integration',
                        ru: 'Интеграция ИИ и LLM',
                        zh: 'AI与LLM集成'
                    },
                    desc: {
                        en: 'Deploy production-grade AI across multi-cloud environments. Integrate GPT-4o, Claude 3.5, and Gemini via Vertex AI, Bedrock, and Azure OpenAI. Build intelligent automation, RAG pipelines, and enterprise AI gateways.',
                        pt: 'Implante IA de nível corporativo em ambientes multi-cloud. Integre GPT-4o, Claude 3.5 e Gemini via Vertex AI, Bedrock e Azure OpenAI. Construa automação inteligente, pipelines RAG e gateways de IA empresariais.',
                        es: 'Implemente IA de nivel empresarial en entornos multi-cloud. Integre GPT-4o, Claude 3.5 y Gemini mediante Vertex AI, Bedrock y Azure OpenAI. Construya automatización inteligente, pipelines RAG y gateways de IA empresariales.',
                        de: 'Bereitstellung von Enterprise-KI in Multi-Cloud-Umgebungen. Integration von GPT-4o, Claude 3.5 und Gemini über Vertex AI, Bedrock und Azure OpenAI. Aufbau intelligenter Automatisierung, RAG-Pipelines und Enterprise-KI-Gateways.',
                        ru: 'Развертывайте корпоративный ИИ в мультиоблачных средах. Интегрируйте GPT-4o, Claude 3.5 и Gemini через Vertex AI, Bedrock и Azure OpenAI. Создавайте интеллектуальную автоматизацию, RAG-конвейеры и корпоративные ИИ-шлюзы.',
                        zh: '在多云环境中部署企业级AI。通过Vertex AI、Bedrock和Azure OpenAI集成GPT-4o、Claude 3.5和Gemini。构建智能自动化、RAG管道和企业AI网关。'
                    },
                    tag1: {
                        en: 'GPT-4o / Claude 3.5',
                        pt: 'GPT-4o / Claude 3.5',
                        es: 'GPT-4o / Claude 3.5',
                        de: 'GPT-4o / Claude 3.5',
                        ru: 'GPT-4o / Claude 3.5',
                        zh: 'GPT-4o / Claude 3.5'
                    },
                    tag2: {
                        en: 'Vertex AI / Bedrock',
                        pt: 'Vertex AI / Bedrock',
                        es: 'Vertex AI / Bedrock',
                        de: 'Vertex AI / Bedrock',
                        ru: 'Vertex AI / Bedrock',
                        zh: 'Vertex AI / Bedrock'
                    },
                    tag3: {
                        en: 'Azure OpenAI',
                        pt: 'Azure OpenAI',
                        es: 'Azure OpenAI',
                        de: 'Azure OpenAI',
                        ru: 'Azure OpenAI',
                        zh: 'Azure OpenAI'
                    }
                },
                python: {
                    title: {
                        en: 'Python Architecture',
                        pt: 'Arquitetura Python',
                        es: 'Arquitectura Python',
                        de: 'Python-Architektur',
                        ru: 'Архитектура Python',
                        zh: 'Python架构'
                    },
                    desc: {
                        en: 'Scalable backend systems with FastAPI. Expertise in API design, and AI/ML model lifecycle management.',
                        pt: 'Sistemas backend escaláveis com FastAPI. Expertise em design de APIs e gestão de ciclo de vida de modelos de IA/ML.',
                        es: 'Sistemas backend escalables con FastAPI. Experiencia en diseño de APIs y gestión del ciclo de vida de modelos de IA/ML.',
                        de: 'Skalierbare Backend-Systeme mit FastAPI. Expertise in API-Design und Verwaltung des Lebenszyklus von KI/ML-Modellen.',
                        ru: 'Масштабируемые бэкенд-системы на FastAPI. Экспертиза в проектировании API и управлении жизненным циклом моделей ИИ/МО.',
                        zh: '使用FastAPI构建可扩展的后端系统。擅长API设计和AI/ML模型生命周期管理。'
                    },
                    tag1: {
                        en: 'Django',
                        pt: 'Django',
                        es: 'Django',
                        de: 'Django',
                        ru: 'Django',
                        zh: 'Django'
                    },
                    tag2: {
                        en: 'FastAPI',
                        pt: 'FastAPI',
                        es: 'FastAPI',
                        de: 'FastAPI',
                        ru: 'FastAPI',
                        zh: 'FastAPI'
                    },
                    tag3: {
                        en: 'Data Pipelines',
                        pt: 'Data Pipelines',
                        es: 'Data Pipelines',
                        de: 'Data Pipelines',
                        ru: 'Data Pipelines',
                        zh: '数据管道'
                    }
                },
                react: {
                    title: {
                        en: 'React & TypeScript',
                        pt: 'React & TypeScript',
                        es: 'React & TypeScript',
                        de: 'React & TypeScript',
                        ru: 'React и TypeScript',
                        zh: 'React与TypeScript'
                    },
                    desc: {
                        en: 'Modern frontend architecture with React 19, Next.js, Vite, and TypeScript. Custom hooks, state management, and performance-optimized components.',
                        pt: 'Arquitetura frontend moderna com React 19, Next.js, Vite e TypeScript. Hooks customizados, gerenciamento de estado e componentes otimizados.',
                        es: 'Arquitectura frontend moderna con React 19, Next.js, Vite y TypeScript. Hooks personalizados, gestión de estado y componentes optimizados.',
                        de: 'Moderne Frontend-Architektur mit React 19, Next.js, Vite und TypeScript. Benutzerdefinierte Hooks, State-Management und leistungsoptimierte Komponenten.',
                        ru: 'Современная фронтенд-архитектура с React 19, Next.js, Vite и TypeScript. Кастомные хуки, управление состоянием и оптимизированные компоненты.',
                        zh: '使用React 19、Next.js、Vite和TypeScript构建现代前端架构。自定义钩子、状态管理和性能优化组件。'
                    },
                    tag1: {
                        en: 'React 19',
                        pt: 'React 19',
                        es: 'React 19',
                        de: 'React 19',
                        ru: 'React 19',
                        zh: 'React 19'
                    },
                    tag2: {
                        en: 'Next.js',
                        pt: 'Next.js',
                        es: 'Next.js',
                        de: 'Next.js',
                        ru: 'Next.js',
                        zh: 'Next.js'
                    },
                    tag3: {
                        en: 'TypeScript',
                        pt: 'TypeScript',
                        es: 'TypeScript',
                        de: 'TypeScript',
                        ru: 'TypeScript',
                        zh: 'TypeScript'
                    }
                },
                cloud: {
                    title: {
                        en: 'Cloud Architecture',
                        pt: 'Arquitetura Cloud',
                        es: 'Arquitectura Cloud',
                        de: 'Cloud-Architektur',
                        ru: 'Облачная архитектура',
                        zh: '云架构'
                    },
                    desc: {
                        en: 'AWS, Azure, and GCP infrastructure design. Serverless functions, containerization, AI Gateway integration, and scalable microservices.',
                        pt: 'Design de infraestrutura AWS, Azure e GCP. Funções serverless, containerização, integração de AI Gateway e microsserviços escaláveis.',
                        es: 'Diseño de infraestructura AWS, Azure y GCP. Funciones serverless, contenerización, integración de AI Gateway y microservicios escalables.',
                        de: 'AWS-, Azure- und GCP-Infrastrukturdesign. Serverless-Funktionen, Containerisierung, KI-Gateway-Integration und skalierbare Microservices.',
                        ru: 'Проектирование инфраструктуры AWS, Azure и GCP. Бессерверные функции, контейнеризация, интеграция ИИ-шлюзов и масштабируемые микросервисы.',
                        zh: 'AWS、Azure和GCP基础设施设计。无服务器函数、容器化、AI网关集成和可扩展微服务。'
                    },
                    tag1: {
                        en: 'AWS',
                        pt: 'AWS',
                        es: 'AWS',
                        de: 'AWS',
                        ru: 'AWS',
                        zh: 'AWS'
                    },
                    tag2: {
                        en: 'Azure',
                        pt: 'Azure',
                        es: 'Azure',
                        de: 'Azure',
                        ru: 'Azure',
                        zh: 'Azure'
                    },
                    tag3: {
                        en: 'Kubernetes',
                        pt: 'Kubernetes',
                        es: 'Kubernetes',
                        de: 'Kubernetes',
                        ru: 'Kubernetes',
                        zh: 'Kubernetes'
                    }
                },
                audio: {
                    title: {
                        en: 'Audio & Web Applications',
                        pt: 'Aplicações de Áudio & Web',
                        es: 'Aplicaciones de Audio & Web',
                        de: 'Audio- & Webanwendungen',
                        ru: 'Аудио и веб-приложения',
                        zh: '音频与Web应用'
                    },
                    desc: {
                        en: 'Professional-grade audio synthesis using Web Audio API and Tone.js. Interactive music applications and real-time audio processing.',
                        pt: 'Síntese de áudio profissional usando Web Audio API e Tone.js. Aplicações musicais interativas e processamento de áudio em tempo real.',
                        es: 'Síntesis de audio profesional usando Web Audio API y Tone.js. Aplicaciones musicales interactivas y procesamiento de audio en tiempo real.',
                        de: 'Professionelle Audiosynthese mit Web Audio API und Tone.js. Interaktive Musik-Anwendungen und Echtzeit-Audiobearbeitung.',
                        ru: 'Профессиональная аудиосинтез с использованием Web Audio API и Tone.js. Интерактивные музыкальные приложения и обработка аудио в реальном времени.',
                        zh: '使用Web Audio API和Tone.js进行专业级音频合成。交互式音乐应用和实时音频处理。'
                    },
                    tag1: {
                        en: 'Web Audio API',
                        pt: 'Web Audio API',
                        es: 'Web Audio API',
                        de: 'Web Audio API',
                        ru: 'Web Audio API',
                        zh: 'Web Audio API'
                    },
                    tag2: {
                        en: 'Tone.js',
                        pt: 'Tone.js',
                        es: 'Tone.js',
                        de: 'Tone.js',
                        ru: 'Tone.js',
                        zh: 'Tone.js'
                    },
                    tag3: {
                        en: 'React',
                        pt: 'React',
                        es: 'React',
                        de: 'React',
                        ru: 'React',
                        zh: 'React'
                    }
                },
                nlp: {
                    title: {
                        en: 'NLP & Automation',
                        pt: 'NLP & Automação',
                        es: 'NLP & Automatización',
                        de: 'NLP & Automatisierung',
                        ru: 'NLP и автоматизация',
                        zh: 'NLP与自动化'
                    },
                    desc: {
                        en: 'Natural language processing for document extraction, intent classification, and entity recognition. Automate complex workflows with intelligent text analysis.',
                        pt: 'Processamento de linguagem natural para extração de documentos, classificação de intenção e reconhecimento de entidades. Automatize fluxos complexos com análise inteligente de texto.',
                        es: 'Procesamiento de lenguaje natural para extracción de documentos, clasificación de intenciones y reconocimiento de entidades. Automatice flujos complejos con análisis inteligente de texto.',
                        de: 'Natürliche Sprachverarbeitung für Dokumentenextraktion, Absichtsklassifizierung und Entitätserkennung. Automatisieren Sie komplexe Workflows mit intelligenter Textanalyse.',
                        ru: 'Обработка естественного языка для извлечения документов, классификации намерений и распознавания сущностей. Автоматизируйте сложные рабочие процессы с помощью интеллектуального текстового анализа.',
                        zh: '用于文档提取、意图分类和实体识别的自然语言处理。通过智能文本分析实现复杂工作流自动化。'
                    },
                    tag1: {
                        en: 'NLP',
                        pt: 'NLP',
                        es: 'NLP',
                        de: 'NLP',
                        ru: 'NLP',
                        zh: 'NLP'
                    },
                    tag2: {
                        en: 'OCR',
                        pt: 'OCR',
                        es: 'OCR',
                        de: 'OCR',
                        ru: 'OCR',
                        zh: 'OCR'
                    },
                    tag3: {
                        en: 'Automation',
                        pt: 'Automação',
                        es: 'Automatización',
                        de: 'Automatisierung',
                        ru: 'Автоматизация',
                        zh: '自动化'
                    }
                },
                security: {
                    title: {
                        en: 'Security & Code Audit',
                        pt: 'Segurança & Auditoria',
                        es: 'Seguridad & Auditoría',
                        de: 'Sicherheit & Code-Audit',
                        ru: 'Безопасность и аудит',
                        zh: '安全与代码审计'
                    },
                    desc: {
                        en: 'Ethical security assessments and code quality audits. Bug bounty services through HackerOne and BugCrowd. Harden applications against vulnerabilities.',
                        pt: 'Avaliações éticas de segurança e auditorias de qualidade de código. Serviços de bug bounty via HackerOne e BugCrowd. Proteja aplicações contra vulnerabilidades.',
                        es: 'Evaluaciones éticas de seguridad y auditorías de calidad de código. Servicios de bug bounty a través de HackerOne y BugCrowd. Proteja aplicaciones contra vulnerabilidades.',
                        de: 'Ethische Sicherheitsbewertungen und Code-Qualitätsaudits. Bug-Bounty-Dienste über HackerOne und BugCrowd. Absicherung von Anwendungen gegen Schwachstellen.',
                        ru: 'Этические оценки безопасности и аудит качества кода. Услуги bug bounty через HackerOne и BugCrowd. Укрепление приложений против уязвимостей.',
                        zh: '道德安全评估和代码质量审计。通过HackerOne和BugCrowd提供漏洞赏金服务。强化应用程序以抵御漏洞。'
                    },
                    tag1: {
                        en: 'HackerOne',
                        pt: 'HackerOne',
                        es: 'HackerOne',
                        de: 'HackerOne',
                        ru: 'HackerOne',
                        zh: 'HackerOne'
                    },
                    tag2: {
                        en: 'BugCrowd',
                        pt: 'BugCrowd',
                        es: 'BugCrowd',
                        de: 'BugCrowd',
                        ru: 'BugCrowd',
                        zh: 'BugCrowd'
                    },
                    tag3: {
                        en: 'Audits',
                        pt: 'Auditorias',
                        es: 'Auditorías',
                        de: 'Audits',
                        ru: 'Аудит',
                        zh: '审计'
                    }
                },
                nodejs: {
                    title: {
                        en: 'Node.js & APIs',
                        pt: 'Node.js & APIs',
                        es: 'Node.js & APIs',
                        de: 'Node.js & APIs',
                        ru: 'Node.js и API',
                        zh: 'Node.js与API'
                    },
                    desc: {
                        en: 'Scalable server-side applications, BFF architecture, and real-time systems using Node.js, Express, and modern API patterns.',
                        pt: 'Aplicações server-side escaláveis, arquitetura BFF e sistemas em tempo real usando Node.js, Express e padrões modernos de API.',
                        es: 'Aplicaciones server-side escalables, arquitectura BFF y sistemas en tiempo real usando Node.js, Express y patrones modernos de API.',
                        de: 'Skalierbare serverseitige Anwendungen, BFF-Architektur und Echtzeitsysteme mit Node.js, Express und modernen API-Patterns.',
                        ru: 'Масштабируемые серверные приложения, BFF-архитектура и системы реального времени с использованием Node.js, Express и современных API-паттернов.',
                        zh: '使用Node.js、Express和现代API模式构建可扩展的服务器端应用、BFF架构和实时系统。'
                    },
                    tag1: {
                        en: 'Node.js',
                        pt: 'Node.js',
                        es: 'Node.js',
                        de: 'Node.js',
                        ru: 'Node.js',
                        zh: 'Node.js'
                    },
                    tag2: {
                        en: 'Express',
                        pt: 'Express',
                        es: 'Express',
                        de: 'Express',
                        ru: 'Express',
                        zh: 'Express'
                    },
                    tag3: {
                        en: 'GraphQL',
                        pt: 'GraphQL',
                        es: 'GraphQL',
                        de: 'GraphQL',
                        ru: 'GraphQL',
                        zh: 'GraphQL'
                    }
                }
            }
        },

        // Work Section
        work: {
            eyebrow: {
                en: 'Portfolio',
                pt: 'Portfólio',
                es: 'Portafolio',
                de: 'Portfolio',
                ru: 'Портфолио',
                zh: '作品集'
            },
            title: {
                en: 'Selected Work',
                pt: 'Trabalhos Selecionados',
                es: 'Trabajos Seleccionados',
                de: 'Ausgewählte Arbeiten',
                ru: 'Избранные работы',
                zh: '精选作品'
            },
            desc: {
                en: 'A showcase of projects spanning mobile games, web applications, and AI-powered systems.',
                pt: 'Uma vitrine de projetos abrangendo jogos mobile, aplicações web e sistemas com IA.',
                es: 'Una vitrina de proyectos que abarca juegos móviles, aplicaciones web y sistemas con IA.',
                de: 'Eine Ausstellung von Projekten aus den Bereichen mobile Spiele, Webanwendungen und KI-gestützte Systeme.',
                ru: 'Витрина проектов: мобильные игры, веб-приложения и системы на базе ИИ.',
                zh: '展示跨越手机游戏、Web应用和AI驱动系统的项目。'
            },
            viewProject: {
                en: 'View Project',
                pt: 'Ver Projeto',
                es: 'Ver Proyecto',
                de: 'Projekt ansehen',
                ru: 'Смотреть проект',
                zh: '查看项目'
            },
            litania: {
                category: {
                    en: 'Mobile Game',
                    pt: 'Jogo Mobile',
                    es: 'Juego Móvil',
                    de: 'Mobiles Spiel',
                    ru: 'Мобильная игра',
                    zh: '手机游戏'
                },
                desc: {
                    en: 'A roguelike adventure with ASCII aesthetics. Strategic gameplay meets retro terminal visuals.',
                    pt: 'Uma aventura roguelike com estética ASCII. Gameplay estratégico encontra visuais retrô de terminal.',
                    es: 'Una aventura roguelike con estética ASCII. Gameplay estratégico encuentra visuales retro de terminal.',
                    de: 'Ein Roguelike-Abenteuer mit ASCII-Ästhetik. Strategisches Gameplay trifft auf Retro-Terminal-Visuals.',
                    ru: 'Рогалик-приключение с эстетикой ASCII. Стратегический геймплей встречается с ретро-визуалом терминала.',
                    zh: '一款具有ASCII美学的Roguelike冒险游戏。战略游戏玩法与复古终端视觉效果相结合。'
                }
            },
            neon: {
                category: {
                    en: 'Mobile Game',
                    pt: 'Jogo Mobile',
                    es: 'Juego Móvil',
                    de: 'Mobiles Spiel',
                    ru: 'Мобильная игра',
                    zh: '手机游戏'
                },
                desc: {
                    en: 'Minimalist arcade experience with geometric precision.',
                    pt: 'Experiência arcade minimalista com precisão geométrica.',
                    es: 'Experiencia arcade minimalista con precisión geométrica.',
                    de: 'Minimalistische Arcade-Erfahrung mit geometrischer Präzision.',
                    ru: 'Минималистичный аркадный опыт с геометрической точностью.',
                    zh: '具有几何精度的极简街机体验。'
                }
            }
        },

        // GitHub Section
        github: {
            eyebrow: {
                en: 'Open Source',
                pt: 'Código Aberto',
                es: 'Código Abierto',
                de: 'Open Source',
                ru: 'Открытый исходный код',
                zh: '开源'
            },
            title: {
                en: 'GitHub Projects',
                pt: 'Projetos GitHub',
                es: 'Proyectos GitHub',
                de: 'GitHub-Projekte',
                ru: 'Проекты GitHub',
                zh: 'GitHub项目'
            },
            desc: {
                en: 'A showcase of open-source contributions and personal projects from',
                pt: 'Uma vitrine de contribuições open-source e projetos pessoais de',
                es: 'Una vitrina de contribuciones open-source y proyectos personales de',
                de: 'Eine Ausstellung von Open-Source-Beiträgen und persönlichen Projekten von',
                ru: 'Витрина вкладов в open source и личных проектов от',
                zh: '来自以下用户的开源贡献和个人项目展示'
            },
            stats: {
                repos: {
                    en: 'repos',
                    pt: 'repositórios',
                    es: 'repositorios',
                    de: 'Repos',
                    ru: 'репозиториев',
                    zh: '仓库'
                },
                stars: {
                    en: 'stars',
                    pt: 'estrelas',
                    es: 'estrellas',
                    de: 'Stars',
                    ru: 'звёзд',
                    zh: '星标'
                }
            },
            sortBy: {
                en: 'Sort by:',
                pt: 'Ordenar por:',
                es: 'Ordenar por:',
                de: 'Sortieren nach:',
                ru: 'Сортировать по:',
                zh: '排序方式:'
            },
            sortOptions: {
                stars: {
                    en: '⭐ Stars',
                    pt: '⭐ Estrelas',
                    es: '⭐ Estrellas',
                    de: '⭐ Stars',
                    ru: '⭐ Звёзды',
                    zh: '⭐ 星标'
                },
                updated: {
                    en: '🕐 Recently Updated',
                    pt: '🕐 Recentemente Atualizado',
                    es: '🕐 Recientemente Actualizado',
                    de: '🕐 Kürzlich aktualisiert',
                    ru: '🕐 Недавно обновлённые',
                    zh: '🕐 最近更新'
                },
                name: {
                    en: '📛 Name',
                    pt: '📛 Nome',
                    es: '📛 Nombre',
                    de: '📛 Name',
                    ru: '📛 Название',
                    zh: '📛 名称'
                }
            },
            loading: {
                en: 'Loading repositories...',
                pt: 'Carregando repositórios...',
                es: 'Cargando repositorios...',
                de: 'Repositories werden geladen...',
                ru: 'Загрузка репозиториев...',
                zh: '加载仓库中...'
            },
            error: {
                en: 'Unable to load repositories.',
                pt: 'Não foi possível carregar os repositórios.',
                es: 'No se pudieron cargar los repositorios.',
                de: 'Repositories konnten nicht geladen werden.',
                ru: 'Не удалось загрузить репозитории.',
                zh: '无法加载仓库。'
            },
            viewOnGithub: {
                en: 'View on GitHub →',
                pt: 'Ver no GitHub →',
                es: 'Ver en GitHub →',
                de: 'Auf GitHub ansehen →',
                ru: 'Смотреть на GitHub →',
                zh: '在GitHub上查看 →'
            },
            noDescription: {
                en: 'No description available.',
                pt: 'Nenhuma descrição disponível.',
                es: 'No hay descripción disponible.',
                de: 'Keine Beschreibung verfügbar.',
                ru: 'Описание отсутствует.',
                zh: '暂无描述。'
            },
            updated: {
                en: 'Updated',
                pt: 'Atualizado',
                es: 'Actualizado',
                de: 'Aktualisiert',
                ru: 'Обновлено',
                zh: '更新于'
            },
            timeAgo: {
                yesterday: {
                    en: 'yesterday',
                    pt: 'ontem',
                    es: 'ayer',
                    de: 'gestern',
                    ru: 'вчера',
                    zh: '昨天'
                },
                days: {
                    en: 'days ago',
                    pt: 'dias atrás',
                    es: 'días atrás',
                    de: 'Tage her',
                    ru: 'дней назад',
                    zh: '天前'
                },
                months: {
                    en: 'months ago',
                    pt: 'meses atrás',
                    es: 'meses atrás',
                    de: 'Monate her',
                    ru: 'месяцев назад',
                    zh: '个月前'
                },
                years: {
                    en: 'years ago',
                    pt: 'anos atrás',
                    es: 'años atrás',
                    de: 'Jahre her',
                    ru: 'лет назад',
                    zh: '年前'
                }
            },
            noRepos: {
                en: 'No repositories found.',
                pt: 'Nenhum repositório encontrado.',
                es: 'No se encontraron repositorios.',
                de: 'Keine Repositories gefunden.',
                ru: 'Репозитории не найдены.',
                zh: '未找到仓库。'
            },
            pagination: {
                previous: {
                    en: 'Previous',
                    pt: 'Anterior',
                    es: 'Anterior',
                    de: 'Zurück',
                    ru: 'Назад',
                    zh: '上一页'
                },
                next: {
                    en: 'Next',
                    pt: 'Próximo',
                    es: 'Siguiente',
                    de: 'Weiter',
                    ru: 'Вперёд',
                    zh: '下一页'
                }
            }
        },

        // About Section
        about: {
            eyebrow: {
                en: 'About',
                pt: 'Sobre',
                es: 'Sobre',
                de: 'Über',
                ru: 'О нас',
                zh: '关于'
            },
            title: {
                en: 'Building the Future with Code',
                pt: 'Construindo o Futuro com Código',
                es: 'Construyendo el Futuro con Código',
                de: 'Die Zukunft mit Code bauen',
                ru: 'Строим будущее с помощью кода',
                zh: '用代码构建未来'
            },
            p1: {
                en: 'Lambda Apps is led by a senior developer with over a decade of experience in building and scaling software products. We specialize in the Python ecosystem with deep expertise in integrating AI technologies into production environments.',
                pt: 'A Lambda Apps é liderada por um desenvolvedor sênior com mais de uma década de experiência em construir e escalar produtos de software. Somos especializados no ecossistema Python com expertise profunda em integrar tecnologias de IA em ambientes de produção.',
                es: 'Lambda Apps está liderada por un desarrollador senior con más de una década de experiencia en construir y escalar productos de software. Nos especializamos en el ecosistema Python con experiencia profunda en integrar tecnologías de IA en entornos de producción.',
                de: 'Lambda Apps wird von einem Senior-Entwickler mit über einem Jahrzehnt Erfahrung im Aufbau und Skalieren von Softwareprodukten geführt. Wir sind auf das Python-Ökosystem spezialisiert mit tiefer Expertise in der Integration von KI-Technologien in Produktionsumgebungen.',
                ru: 'Lambda Apps возглавляет старший разработчик с более чем десятилетним опытом создания и масштабирования программных продуктов. Мы специализируемся на экосистеме Python с глубокой экспертизой в интеграции ИИ-технологий в производственные среды.',
                zh: 'Lambda Apps由一位拥有超过十年构建和扩展软件产品经验的高级开发工程师领导。我们专注于Python生态系统，在将AI技术集成到生产环境方面拥有深厚的专业知识。'
            },
            p2: {
                en: 'Our approach combines technical excellence with open-source values. We believe in code that is as maintainable and efficient as it is functional—delivering solutions that stand the test of time.',
                pt: 'Nossa abordagem combina excelência técnica com valores open-source. Acreditamos em código que é tão mantenível e eficiente quanto funcional—entregando soluções que resistem ao teste do tempo.',
                es: 'Nuestro enfoque combina la excelencia técnica con valores de código abierto. Creemos en el código que es tan mantenible y eficiente como funcional—entregando soluciones que resisten la prueba del tiempo.',
                de: 'Unser Ansatz verbindet technische Exzellenz mit Open-Source-Werten. Wir glauben an Code, der so wartbar und effizient ist wie funktional—Lösungen, die den Test der Zeit bestehen.',
                ru: 'Наш подход сочетает техническое совершенство с ценностями open source. Мы верим в код, который так же поддерживаем и эффективен, как и функционален—предоставляя решения, которые выдерживают испытание временем.',
                zh: '我们的方法将技术卓越与开源价值观相结合。我们相信代码应该像功能一样可维护和高效——交付经得起时间考验的解决方案。'
            },
            githubProfile: {
                en: 'GitHub Profile',
                pt: 'Perfil GitHub',
                es: 'Perfil GitHub',
                de: 'GitHub-Profil',
                ru: 'Профиль GitHub',
                zh: 'GitHub主页'
            },
            stats: {
                experience: {
                    en: 'Years of Experience',
                    pt: 'Anos de Experiência',
                    es: 'Años de Experiencia',
                    de: 'Jahre Erfahrung',
                    ru: 'Лет опыта',
                    zh: '年经验'
                },
                aiDeployment: {
                    en: 'AI Deployment',
                    pt: 'Deploy de IA',
                    es: 'Deploy de IA',
                    de: 'KI-Bereitstellung',
                    ru: 'Развёртывание ИИ',
                    zh: 'AI部署'
                },
                cloudPlatforms: {
                    en: 'Cloud Platforms',
                    pt: 'Plataformas Cloud',
                    es: 'Plataformas Cloud',
                    de: 'Cloud-Plattformen',
                    ru: 'Облачные платформы',
                    zh: '云平台'
                },
                pythonSpecialist: {
                    en: 'Ecosystem Specialist',
                    pt: 'Especialista em Ecossistema',
                    es: 'Especialista en Ecosistema',
                    de: 'Ökosystem-Spezialist',
                    ru: 'Специалист по экосистеме',
                    zh: '生态系统专家'
                }
            }
        },

        // Contact Section
        contact: {
            eyebrow: {
                en: 'Get in Touch',
                pt: 'Entre em Contato',
                es: 'Ponte en Contacto',
                de: 'Kontakt aufnehmen',
                ru: 'Связаться',
                zh: '联系我们'
            },
            title: {
                en: "Let's Build Something Great",
                pt: 'Vamos Construir Algo Incrível',
                es: 'Construyamos Algo Genial',
                de: 'Lassen Sie uns etwas Großartiges bauen',
                ru: 'Давайте создадим что-то великое',
                zh: '让我们一起创造伟大的事物'
            },
            desc: {
                en: 'Have a project in mind? Let\'s discuss how we can help bring your ideas to life.',
                pt: 'Tem um projeto em mente? Vamos discutir como podemos ajudar a trazer suas ideias à vida.',
                es: '¿Tienes un proyecto en mente? Discutamos cómo podemos ayudar a dar vida a tus ideas.',
                de: 'Haben Sie ein Projekt im Sinn? Lassen Sie uns besprechen, wie wir Ihre Ideen zum Leben erwecken können.',
                ru: 'Есть проект на примете? Давайте обсудим, как мы можем помочь воплотить ваши идеи в жизнь.',
                zh: '有项目想法？让我们讨论如何帮助您将想法变为现实。'
            },
            whatsapp: {
                en: 'WhatsApp',
                pt: 'WhatsApp',
                es: 'WhatsApp',
                de: 'WhatsApp',
                ru: 'WhatsApp',
                zh: 'WhatsApp'
            },
            github: {
                en: 'GitHub',
                pt: 'GitHub',
                es: 'GitHub',
                de: 'GitHub',
                ru: 'GitHub',
                zh: 'GitHub'
            }
        },

        // Footer
        footer: {
            copyright: {
                en: '© 2026 Lambda Apps. All rights reserved.',
                pt: '© 2026 Lambda Apps. Todos os direitos reservados.',
                es: '© 2026 Lambda Apps. Todos los derechos reservados.',
                de: '© 2026 Lambda Apps. Alle Rechte vorbehalten.',
                ru: '© 2026 Lambda Apps. Все права защищены.',
                zh: '© 2026 Lambda Apps。保留所有权利。'
            }
        }
    };

    // Current language
    let currentLang = DEFAULT_LANG;

    /**
     * Initialize the i18n system
     */
    function init() {
        // Load saved language preference
        const savedLang = localStorage.getItem(STORAGE_KEY);
        if (savedLang && LANGUAGES[savedLang]) {
            currentLang = savedLang;
        } else {
            // Try to detect browser language
            const browserLang = navigator.language.split('-')[0];
            if (LANGUAGES[browserLang]) {
                currentLang = browserLang;
            }
        }

        // Apply initial language
        applyLanguage();
        
        // Create language switcher
        createLanguageSwitcher();
    }

    /**
     * Get current language
     */
    function getCurrentLang() {
        return currentLang;
    }

    /**
     * Get available languages
     */
    function getLanguages() {
        return LANGUAGES;
    }

    /**
     * Set language
     */
    function setLanguage(lang) {
        if (!LANGUAGES[lang]) {
            console.warn(`Language "${lang}" not supported`);
            return false;
        }

        currentLang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
        applyLanguage();
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
        
        return true;
    }

    /**
     * Get translation for a key path
     * Example: t('hero.title.line1') or t('services.items.ai.title')
     */
    function t(keyPath, lang = currentLang) {
        const keys = keyPath.split('.');
        let value = TRANSLATIONS;

        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                console.warn(`Translation key not found: ${keyPath}`);
                return keyPath; // Return key as fallback
            }
        }

        // If value is an array, return the element for the language index
        if (Array.isArray(value)) {
            const langIndex = ['en', 'pt', 'es', 'de', 'ru', 'zh'].indexOf(lang);
            if (langIndex !== -1 && langIndex < value.length) {
                return value[langIndex];
            }
            return value[0]; // Fallback to English
        }

        // If value is an object with language keys
        if (value && typeof value === 'object' && lang in value) {
            return value[lang];
        }

        // If value is a string (for simple translations)
        if (typeof value === 'string') {
            return value;
        }

        console.warn(`Translation not found for key: ${keyPath} in language: ${lang}`);
        return keyPath;
    }

    /**
     * Apply current language to all elements with data-i18n attribute
     */
    function applyLanguage() {
        // Update HTML lang attribute
        document.documentElement.lang = currentLang;
        document.documentElement.dir = LANGUAGES[currentLang].dir;

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = t(key);
            
            if (el.hasAttribute('data-i18n-attr')) {
                // Update specific attribute
                const attr = el.getAttribute('data-i18n-attr');
                el.setAttribute(attr, translation);
            } else {
                // Update text content
                el.textContent = translation;
            }
        });

        // Update page title if needed
        const titleEl = document.querySelector('title[data-i18n]');
        if (titleEl) {
            document.title = t(titleEl.getAttribute('data-i18n'));
        }
    }

    /**
     * Create language switcher dropdown
     */
    function createLanguageSwitcher() {
        const header = document.querySelector('.header-inner');
        if (!header) return;

        // Create language switcher container
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        
        // Create select element
        const select = document.createElement('select');
        select.className = 'language-select';
        select.setAttribute('aria-label', 'Select language');
        
        // Add options for each language
        Object.entries(LANGUAGES).forEach(([code, info]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${info.flag} ${info.name}`;
            option.selected = code === currentLang;
            select.appendChild(option);
        });

        // Handle change
        select.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });

        switcher.appendChild(select);
        
        // Insert before menu toggle on mobile, or in nav on desktop
        const menuToggle = header.querySelector('.menu-toggle');
        if (menuToggle) {
            header.insertBefore(switcher, menuToggle);
        } else {
            header.appendChild(switcher);
        }
    }

    // Public API
    return {
        init,
        getCurrentLang,
        getLanguages,
        setLanguage,
        t,
        applyLanguage
    };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', I18N.init);
} else {
    I18N.init();
}
